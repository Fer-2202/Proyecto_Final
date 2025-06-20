from django.db import models

class ServiciosEducativos(models.Model):
    value = models.CharField(max_length=255, unique=True, null=False)
    label = models.CharField(max_length=255, unique=True, null=False)
    title = models.CharField(max_length=255, unique=True, null=False)

    def __str__(self):
        return self.value

class ServiciosEducativosImage(models.Model):
    servicios_educativos = models.ForeignKey(ServiciosEducativos, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='servicios-educativos/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    


class ServiciosEducativosFacts(models.Model):
    servicios_educativos = models.ForeignKey(ServiciosEducativos, related_name='facts', on_delete=models.CASCADE)
    fact = models.TextField()

class ServiciosEducativosDescription(models.Model):
    servicios_educativos = models.ForeignKey(ServiciosEducativos, related_name='descriptions', on_delete=models.CASCADE)
    description = models.TextField()
    
class ServiciosEducativosButtons(models.Model):
    servicios_educativos = models.ForeignKey(ServiciosEducativos, related_name='buttons', on_delete=models.CASCADE)
    label = models.CharField(max_length=255, unique=True, null=False)
    link = models.CharField(max_length=255, unique=True, null=False, blank=True, default='')
    