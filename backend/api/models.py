from django.db import models
from django.conf import settings
from django.contrib.auth.models import Group, User

# Sections
class Sections(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Section Name")

    class Meta:
        verbose_name = "Section"
        verbose_name_plural = "Sections"
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def num_habitats(self):
        return self.habitats.count()


# Provinces
class Provinces(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Province Name")

    class Meta:
        verbose_name = "Province"
        verbose_name_plural = "Provinces"
        ordering = ["name"]

    def __str__(self):
        return self.name


# Species
class Species(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Species Name")

    class Meta:
        verbose_name = "Species"
        verbose_name_plural = "Species"
        ordering = ["name"]

    def __str__(self):
        return self.name


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


# Tickets
class Tickets(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, verbose_name="Ticket Price")
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Ticket Name")
    description = models.CharField(max_length=100, null=False, verbose_name="Description")

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"
        ordering = ["name"]

    def __str__(self):
        return self.name


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


# Purchase Orders
class PurchaseOrders(models.Model):
    order_date = models.DateField(auto_now_add=True, null=False)
    purchase_date = models.DateField(auto_now_add=True, null=False)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    email = models.EmailField(max_length=50, null=False)
    qr_image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ("PENDING", "Pending"),
            ("PAID", "Paid"),
            ("CANCELLED", "Cancelled"),
            ("FAILED", "Failed")
        ],
        default="PENDING"
    )
    id_visit = models.ForeignKey('Visits', on_delete=models.CASCADE, related_name='purchase_orders')
    id_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchase_orders')

    class Meta:
        verbose_name = "Purchase Order"
        verbose_name_plural = "Purchase Orders"
        ordering = ["-order_date"]

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"


# Tickets Purchase Order (tabla intermedia Tickets <-> PurchaseOrders)
class TicketsPurchaseOrder(models.Model):
    amount = models.PositiveIntegerField(null=False)
    id_ticket = models.ForeignKey('Tickets', on_delete=models.CASCADE, related_name='tickets_purchase_order')
    id_purchase_order = models.ForeignKey('PurchaseOrders', on_delete=models.CASCADE, related_name='tickets_purchase_order')

    class Meta:
        verbose_name = "Tickets Purchase Order"
        verbose_name_plural = "Tickets Purchase Orders"
        unique_together = ("id_ticket", "id_purchase_order")


# Payment (modelo nuevo para sistema de pagos robusto)
class Payment(models.Model):
    purchase_order = models.OneToOneField('PurchaseOrders', on_delete=models.CASCADE, related_name='payment')
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=30, choices=[
        ("CARD", "Card"),
        ("PAYPAL", "PayPal"),
        ("CASH", "Cash")
    ])
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=[
        ("SUCCESS", "Success"),
        ("FAILED", "Failed")
    ])

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
        ordering = ["-payment_date"]

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"


# Habitats
class Habitats(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Habitat Name")
    nums_animals = models.PositiveIntegerField(null=False, verbose_name="Number of Animals")
    description = models.CharField(max_length=100, null=False, verbose_name="Description")
    id_section = models.ForeignKey('Sections', on_delete=models.CASCADE, related_name='habitats')

    class Meta:
        verbose_name = "Habitat"
        verbose_name_plural = "Habitats"
        ordering = ["name"]

    def __str__(self):
        return self.name


# Animals
class Animals(models.Model):
    name = models.CharField(max_length=30, null=False, verbose_name="Animal Name")
    age = models.PositiveIntegerField(null=False, verbose_name="Age")
    id_species = models.ForeignKey('Species', on_delete=models.CASCADE, related_name='animals')
    id_conservation_status = models.ForeignKey('ConservationStatus', on_delete=models.CASCADE, related_name='animals')
    id_habitats = models.ForeignKey('Habitats', on_delete=models.CASCADE, related_name='animals')

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animals"
        ordering = ["name"]

    def __str__(self):
        return self.name


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
        """Returns a comma-separated string of role names"""
        return ', '.join([role.name for role in self.roles.all()])

    def add_role(self, role_name):
        """Adds a role to the user"""
        role, created = Group.objects.get_or_create(name=role_name)
        self.roles.add(role)
        self.user.groups.add(role)  # Sync with Django's user groups
        self.save()

    def remove_role(self, role_name):
        """Removes a role from the user"""
        role = Group.objects.get(name=role_name)
        self.roles.remove(role)
        self.user.groups.remove(role)  # Sync with Django's user groups
        self.save()

    def has_role(self, role_name):
        """Checks if user has a specific role"""
        return self.roles.filter(name=role_name).exists() or \
               self.user.groups.filter(name=role_name).exists()

    def sync_roles_to_user(self):
        """Syncs profile roles to Django user groups"""
        self.user.groups.set(self.roles.all())
        self.user.save()