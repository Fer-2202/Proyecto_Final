from django.db import models

#Sections
class Sections (models.Model):
    name = models.CharField(max_length=30, null=False)
    num_habitats = models.IntegerField(null=False)

    def __str__(self):
        return self.name


#roles
class Roles (models.Model):
    name = models.CharField(max_length=30, null=False)

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


#usuarios
class Users (models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    telephone = models.IntegerField(null=False,max_digits=15) 
    ced_or_passport = models.CharField(max_length=30, null=False)
    email = models.CharField(max_length=60, null=False, unique=True)
    birth_date = models.DateField(max_length=10)
    address = models.CharField(max_length=60, null=False)
    id_role = models.ForeignKey(Roles,on_delete=models.CASCADE, related_name='users')
    id_provinces = models.ForeignKey(Provinces,on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return self.first_name


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
    id_user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='purchase_orders')

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