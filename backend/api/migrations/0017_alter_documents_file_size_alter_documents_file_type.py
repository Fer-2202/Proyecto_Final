# Generated by Django 5.2.3 on 2025-06-27 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_remove_documents_peso_remove_documents_tipo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documents',
            name='file_size',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='documents',
            name='file_type',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
