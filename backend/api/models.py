from django.db import models
from django.conf import settings
from django.contrib.auth.models import Group, User
from api.tickets.models import Tickets

# Conservation Status
class ConservationStatus(models.Model):
    STATUS_CHOICES = [
        ("LC", "Least Concern"),
        ("NT", "Near Threatened"),
        ("VU", "Vulnerable"),
        ("EN", "Endangered"),
        ("CR", "Critically Endangered"),
        ("EW", "Extinct in the Wild"),
        ("EX", "Extinct"),
    ]
    name = models.CharField(max_length=30, choices=STATUS_CHOICES, null=False, unique=True, verbose_name="Conservation Status")

    class Meta:
        verbose_name = "Conservation Status"
        verbose_name_plural = "Conservation Statuses"
        ordering = ["name"]

    def __str__(self):
        return self.get_name_display()





# Visits
class Visits(models.Model):
    day = models.DateField(null=False, verbose_name="Visit Day")
    total_slots = models.PositiveIntegerField(default=1276, null=False, verbose_name="Total Slots")
    occupied_slots = models.PositiveIntegerField(default=0, verbose_name="Occupied Slots")

    class Meta:
        verbose_name = "Visit"
        verbose_name_plural = "Visits"
        ordering = ["-day"]
        unique_together = ("day",)

    def __str__(self):
        return self.day.strftime('%Y-%m-%d')

    def has_available_slots(self, requested_slots):
        return self.total_slots - self.occupied_slots >= requested_slots

    def occupy_slots(self, slots):
        if self.has_available_slots(slots):
            self.occupied_slots += slots
            self.save()
            return True
        return False


# Purchase Orders
class PurchaseOrders(models.Model):
    order_date = models.DateField(auto_now_add=True)
    purchase_date = models.DateField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=False, default=0.0)
    email = models.EmailField(max_length=50)
    qr_image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[("PENDING", "Pending"), ("PAID", "Paid"), ("CANCELLED", "Cancelled"), ("FAILED", "Failed")],
        default="PENDING"
    )
    visit = models.ForeignKey('Visits', on_delete=models.CASCADE, related_name='purchase_orders')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchase_orders')

    class Meta:
        verbose_name = "Purchase Order"
        verbose_name_plural = "Purchase Orders"
        ordering = ["-order_date"]

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"

    def calculate_total_price(self):
        total = sum([item.subtotal for item in self.tickets_purchase_order.all()])
        self.total_price = total
        self.save()

    def occupy_visit_slots(self):
        total_tickets = sum([item.amount for item in self.tickets_purchase_order.all()])
        return self.visit.occupy_slots(total_tickets)

    def mark_as_paid(self):
        self.status = "PAID"
        self.save()


# Tickets Purchase Order (Intermediate Table)
class TicketsPurchaseOrder(models.Model):
    amount = models.PositiveIntegerField()
    ticket = models.ForeignKey('Tickets', on_delete=models.CASCADE, related_name='tickets_purchase_order')
    purchase_order = models.ForeignKey('PurchaseOrders', on_delete=models.CASCADE, related_name='tickets_purchase_order')

    class Meta:
        verbose_name = "Tickets Purchase Order"
        verbose_name_plural = "Tickets Purchase Orders"
        unique_together = ("ticket", "purchase_order")

    @property
    def subtotal(self):
        return self.amount * self.ticket.price


# Payment
class Payment(models.Model):
    purchase_order = models.OneToOneField('PurchaseOrders', on_delete=models.CASCADE, related_name='payment')
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=30, choices=[("CARD", "Card"), ("PAYPAL", "PayPal"), ("CASH", "Cash")])
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=[("SUCCESS", "Success"), ("FAILED", "Failed")])

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
        ordering = ["-payment_date"]

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.status == "SUCCESS":
            self.purchase_order.mark_as_paid()


# Habitats
class Habitats(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Habitat Name")
    nums_animals = models.PositiveIntegerField(null=False, verbose_name="Number of Animals")
    description = models.CharField(max_length=100, null=False, verbose_name="Description")
    section = models.ForeignKey('Sections', on_delete=models.CASCADE, related_name='habitats')

    class Meta:
        verbose_name = "Habitat"
        verbose_name_plural = "Habitats"
        ordering = ["name"]

    def __str__(self):
        return self.name





class AuditLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    record_id = models.PositiveIntegerField(null=True, blank=True)
    details = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.timestamp} - {self.user} - {self.action} - {self.model} - {self.record_id}'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    roles = models.ManyToManyField(Group, blank=True, related_name='user_profiles')
    province = models.ForeignKey('Provinces', on_delete=models.SET_NULL, null=True, blank=True, related_name='user_profiles')

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f'{self.user.username} Profile'

    @property
    def role_names(self):
        return ', '.join([role.name for role in self.roles.all()])

    def add_role(self, role_name):
        role, created = Group.objects.get_or_create(name=role_name)
        self.roles.add(role)
        self.user.groups.add(role)
        self.save()

    def remove_role(self, role_name):
        role = Group.objects.get(name=role_name)
        self.roles.remove(role)
        self.user.groups.remove(role)
        self.save()

    def has_role(self, role_name):
        return self.roles.filter(name=role_name).exists() or \
               self.user.groups.filter(name=role_name).exists()

    def sync_roles_to_user(self):
        self.user.groups.set(self.roles.all())
        self.user.save()
