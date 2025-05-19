from django.db import models


# Create your models here.


#roles
class roles (models.Model):
    name = models.CharField(max_length=30, null=False)


#province
class provinces (models.Model):
    name = models.CharField(max_length=30, null=False)


#usuarios
class users (models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    telephone = models.IntegerField() 
    ced_or_passport = models.CharField(30)
    email = models.CharField(max_length=60, null=False, unique=True)
    birth_date = models.DateField(10)
    id_role = models.ForeignKey(roles,on_delete=models.CASCADE, related_name='users')
    id_provinces = models.ForeignKey(provinces,on_delete=models.CASCADE, related_name='users')
    address = models.CharField(max_length=60, null=False)


#Tickets
class tickets (models.Model):
    price = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=50, null=False)


#visits
class visits (models.Model):
    day = models.DateField(null=False)
    total_slots = models.IntegerField(default=1276, null=False)
    occupied_slots = models.IntegerField(default=0,)


#Purchase_orders
class purchase_orders (models.Model):
    id_user = models.ForeignKey(users, on_delete=models.CASCADE, related_name='purchase_orders')
    order_date = models.DateField(auto_now_add=True, null=False)
    total_amount = models.DecimalField(max_digits=30, decimal_places=2)
    email = models.CharField(max_length=50,unique=True, null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    purchase_date = models.DateField(null=False)
    quantity = models.IntegerField(null=False)
    id_visit = models.ForeignKey(visits, on_delete=models.CASCADE, related_name='purchase_orders')
    qr_image = models.CharField(null=False)


#tickets_purchase_order
class tickets_purchase_order (models.Model):
    id_ticket = models.ForeignKey(tickets, on_delete=models.CASCADE, related_name='tickets')
    id_purchase_order = models.ForeignKey(purchase_orders, on_delete=models.CASCADE, related_name='purchase_order')
    amount = models.IntegerField(null=False,)