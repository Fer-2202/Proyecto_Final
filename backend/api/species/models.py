from django.db import models

class Species(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, verbose_name="Species Name")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    img = models.ImageField(upload_to='species/', blank=True, null=True, verbose_name="Image")
    scientific_name = models.CharField(max_length=100, blank=True, null=True, verbose_name="Scientific Name")

    class Meta:
        verbose_name = "Species"
        verbose_name_plural = "Species"
        ordering = ['name']
        
    def __str__(self):
        return self.name
        
    def get_image_url(self):
        if self.img:
            return self.img.url
        return None