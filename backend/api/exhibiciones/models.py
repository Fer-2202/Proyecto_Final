from django.db import models

class Exhibicion(models.Model):
    value = models.CharField(max_length=30, unique=True, null=False)
    label = models.CharField(max_length=30, unique=True, null=False)
    title = models.CharField(max_length=30, unique=True, null=False)

    def __str__(self):
        return self.value

class ExhibicionImage(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='exhibitions/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ExhibicionFacts(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, related_name='facts', on_delete=models.CASCADE)
    fact = models.TextField()


class ExhibicionDescription(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, related_name='descriptions', on_delete=models.CASCADE)
    description = models.TextField()
    

class ExhibicionButtons(models.Model):
    exhibicion = models.ForeignKey(Exhibicion, related_name='buttons', on_delete=models.CASCADE)
    label = models.CharField(max_length=255, unique=True, null=False)
    link = models.CharField(max_length=255, unique=True, null=False, blank=True, default='')