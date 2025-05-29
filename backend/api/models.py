from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User, Permission

#Sections
class Sections (models.Model):
    name = models.CharField(max_length=30, null=False)
    num_habitats = models.IntegerField(null=False)

    def __str__(self):
        return self.name


#province
class Provinces (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#stecions
class Species (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#conservation_status
class Conservation_Status (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#Tickets
class Tickets (models.Model):
    price = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name


#visits
class Visits (models.Model):
    day = models.DateField(null=False)
    total_slots = models.IntegerField(default=1276, null=False)
    occupied_slots = models.IntegerField(default=0,)

    def __str__(self):
        return self.day.strftime('%Y-%m-%d')


#Purchase_orders
class Purchase_Orders(models.Model):
    order_date = models.DateField(auto_now_add=True, null=False)
    total_amount = models.DecimalField(max_digits=30, decimal_places=2)
    email = models.CharField(max_length=50, unique=True, null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    purchase_date = models.DateField(auto_now_add=True ,null=False)
    quantity = models.IntegerField(null=False)
    qr_image = models.CharField(max_length=50, null=False)
    id_visit = models.ForeignKey(Visits, on_delete=models.CASCADE, related_name='purchase_orders')
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchase_orders')

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"


# tickets_purchase_order
class Tickets_Purchase_Order(models.Model):
    amount = models.IntegerField(null=False)
    id_ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE, related_name='tickets_purchase_order')
    id_purchase_order = models.ForeignKey(Purchase_Orders, on_delete=models.CASCADE, related_name='tickets_purchase_order')


#habitats
class Habitats (models.Model):
    name = models.CharField(max_length=30, null=False)
    nums_animals = models.IntegerField(null=False)
    description = models.CharField(max_length=50, null=False)
    id_section = models.ForeignKey(Sections, on_delete=models.CASCADE, related_name='habitats')

    def __str__(self):
        return self.name


#animals
class Animals (models.Model):
    name = models.CharField(max_length=30, null=False)
    age = models.IntegerField(null=False)
    id_species = models.ForeignKey(Species, on_delete=models.CASCADE, related_name='animals')
    id_conservation_status = models.ForeignKey(Conservation_Status, on_delete=models.CASCADE, related_name='animals')
    id_habitats = models.ForeignKey(Habitats, on_delete=models.CASCADE, related_name='animals')

    def __str__(self):
        return self.name


#usuarios
class UsersProfile (models.Model):
    phone = models.CharField(max_length=20, blank=True, null=False) 
    address = models.CharField(max_length=255, null=False)
    birth_date = models.DateField(null=False, blank=True)
    ced_or_passport = models.CharField(max_length=30, null=False)
    email = models.EmailField(max_length=254, blank=True, null=False, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/',
    null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='UsersProfile')
    id_role = models.ManyToManyField(Group, blank=True, related_name='UsersProfile')
    id_provinces = models.ForeignKey(Provinces,on_delete=models.CASCADE, related_name='UsersProfile')

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return self.first_name