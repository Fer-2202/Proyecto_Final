from django.db import models

#Sections
class sections (models.Model):
    name = models.CharField(max_length=30, null=False)
    num_habitats = models.IntegerField(null=False)
    
    def __str__(self):
        return self.name


#roles
class roles (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#province
class provinces (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#stecions
class species (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name
  

#conservation_status
class conservation_status (models.Model):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


#usuarios
class users (models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    telephone = models.IntegerField() 
    ced_or_passport = models.CharField(max_length=30, null=False)
    email = models.CharField(max_length=60, null=False, unique=True)
    birth_date = models.DateField(max_length=10)
    id_role = models.ForeignKey(roles,on_delete=models.CASCADE, related_name='users')
    id_provinces = models.ForeignKey(provinces,on_delete=models.CASCADE, related_name='users')
    address = models.CharField(max_length=60, null=False)

    def __str__(self):
        return self.first_name


#Tickets
class tickets (models.Model):
    price = models.DecimalField(max_digits=20, decimal_places=2, null=False)
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name

#visits
class visits (models.Model):
    day = models.DateField(null=False)
    total_slots = models.IntegerField(default=1276, null=False)
    occupied_slots = models.IntegerField(default=0,)

    def __str__(self):
        return self.day.strftime('%Y-%m-%d')  # or any format you prefer



#Purchase_orders
class purchase_orders(models.Model):
    order_date = models.DateField(auto_now_add=True, null=False)
    total_amount = models.DecimalField(max_digits=30, decimal_places=2)
    email = models.CharField(max_length=50, unique=True, null=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    purchase_date = models.DateField(auto_now_add=True ,null=False)
    quantity = models.IntegerField(null=False)
    qr_image = models.CharField(max_length=50, null=False)
    id_visit = models.ForeignKey(visits, on_delete=models.CASCADE, related_name='purchase_orders')
    id_user = models.ForeignKey(users, on_delete=models.CASCADE, related_name='purchase_orders')

    def __str__(self):
        return f"Purchase Order by {self.email} on {self.order_date.strftime('%Y-%m-%d')}"

# tickets_purchase_order
class tickets_purchase_order(models.Model):
    amount = models.IntegerField(null=False)
    id_ticket = models.ForeignKey(tickets, on_delete=models.CASCADE, related_name='tickets_purchase_order')
    id_purchase_order = models.ForeignKey(purchase_orders, on_delete=models.CASCADE, related_name='tickets_purchase_order')

    

#habitats
class habitats (models.Model):
    name = models.CharField(max_length=30, null=False)
    nums_animals = models.IntegerField(null=False)
    description = models.CharField(max_length=50, null=False)
    id_section = models.ForeignKey(sections, on_delete=models.CASCADE, related_name='habitats')

    def __str__(self):
        return self.name


#animals
class animals (models.Model):
    name = models.CharField(max_length=30, null=False)
    age = models.IntegerField(null=False)
    id_species = models.ForeignKey(species, on_delete=models.CASCADE, related_name='animals')
    id_conservation_status = models.ForeignKey(conservation_status, on_delete=models.CASCADE, related_name='animals')
    id_habitats = models.ForeignKey(habitats, on_delete=models.CASCADE, related_name='animals')

    def __str__(self):
        return self.name

