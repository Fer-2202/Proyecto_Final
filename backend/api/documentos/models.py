import os
from django.db import models

class Documents(models.Model):
    titulo = models.CharField("Título", max_length=255)
    description = models.TextField("Descripción")
    fecha = models.DateField("Fecha de publicación")
    file_type = models.CharField("Tipo de archivo", max_length=10, blank=True, null=True)
    file_size = models.CharField("Tamaño del archivo", max_length=20, blank=True, null=True)
    document = models.FileField("Archivo", upload_to='documentos/')

    def save(self, *args, **kwargs):
        try:
            # Obtener la extensión del archivo sin el punto (ej. pdf, xlsx)
            extension = os.path.splitext(self.document.name)[1].lower()
            self.file_type = extension[1:] if extension.startswith('.') else extension

            # Calcular tamaño del archivo en formato legible
            size_bytes = self.document.size
            if size_bytes < 1024:
                self.file_size = f"{size_bytes} B"
            elif size_bytes < 1024 * 1024:
                self.file_size = f"{size_bytes / 1024:.2f} KB"
            else:
                self.file_size = f"{size_bytes / (1024 * 1024):.2f} MB"
        except Exception as e:
            self.file_type = 'Desconocido'
            self.file_size = 'Desconocido'
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = "Documento"
        verbose_name_plural = "Documentos"
        ordering = ['-fecha']