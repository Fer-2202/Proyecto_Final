# Generated by Django 5.2 on 2025-05-19 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='birth_date',
            field=models.DateField(max_length=10),
        ),
    ]
