# Generated by Django 5.2.3 on 2025-06-26 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_servicioseducativos_label_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Payment',
            new_name='Payments',
        ),
        migrations.AddField(
            model_name='tickets',
            name='occupied_slots',
            field=models.PositiveIntegerField(default=0, verbose_name='Occupied Slots'),
        ),
        migrations.AddField(
            model_name='tickets',
            name='total_slots',
            field=models.PositiveIntegerField(default=1276, verbose_name='Total Slots'),
        ),
        migrations.AlterField(
            model_name='servicioseducativosimage',
            name='image',
            field=models.ImageField(upload_to='servicios-educativos/'),
        ),
    ]
