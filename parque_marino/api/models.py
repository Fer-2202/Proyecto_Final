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
    id_role = models.ForeignKey(roles,on_delete=models.CASCADE,related_name='users')
    id_provinces = models.ForeignKey(provinces,on_delete=models.CASCADE,related_name='users')
    address = models.CharField(max_length=60, null=False)