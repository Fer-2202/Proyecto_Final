from django.db import models
from django.conf import settings # Import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User, Permission

#Sections
class Sections(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Section Name")
    num_habitats = models.PositiveIntegerField(null=False, verbose_name="Number of Habitats")

    class Meta:
        verbose_name = "Section"
        verbose_name_plural = "Sections"
        ordering = ["name"]

    def __str__(self):
        return self.name




#province
class Provinces(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Province Name")

    class Meta:
        verbose_name = "Province"
        verbose_name_plural = "Provinces"
        ordering = ["name"]

    def __str__(self):
        return self.name


#stecions
class Species(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Species Name")

    class Meta:
        verbose_name = "Species"
        verbose_name_plural = "Species"
        ordering = ["name"]

    def __str__(self):
        return self.name
  

#conservation_status
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




#Tickets
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

#visits
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



#Purchase_orders
class PurchaseOrders(models.Model):
    order_date = models.DateField(auto_now_add=True, null=False)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    email = models.EmailField(max_length=50, null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    purchase_date = models.DateField(auto_now_add=True, null=False)
    quantity = models.PositiveIntegerField(null=False)
    qr_image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    id_visit = models.ForeignKey('Visits', on_delete=models.CASCADE, related_name='purchase_orders')
    id_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchase_orders')

    class Meta:
        verbose_name = "Purchase Order"
        verbose_name_plural = "Purchase Orders"
        ordering = ["-order_date"]

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"

# tickets_purchase_order
class TicketsPurchaseOrder(models.Model):
    amount = models.PositiveIntegerField(null=False)
    id_ticket = models.ForeignKey('Tickets', on_delete=models.CASCADE, related_name='tickets_purchase_order')
    id_purchase_order = models.ForeignKey('PurchaseOrders', on_delete=models.CASCADE, related_name='tickets_purchase_order')

    class Meta:
        verbose_name = "Tickets Purchase Order"
        verbose_name_plural = "Tickets Purchase Orders"
        unique_together = ("id_ticket", "id_purchase_order")

    

#habitats
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


#animals
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


# User Profile model to extend the built-in User model
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True, unique=True)
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

