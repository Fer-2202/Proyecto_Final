from django.db import models

class ProgramaEducativo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='programas/', blank=True, null=True)
    

    def __str__(self):
        return self.title

class ProgramaItem(models.Model):
    programa = models.ForeignKey(ProgramaEducativo, related_name='items', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.programa.title} - {self.text[:30]}"