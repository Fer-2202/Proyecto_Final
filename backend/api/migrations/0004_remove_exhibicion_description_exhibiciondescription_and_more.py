# Generated by Django 5.2.3 on 2025-06-16 18:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_exhibicionimage_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exhibicion',
            name='description',
        ),
        migrations.CreateModel(
            name='ExhibicionDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(verbose_name='Exhibition Description')),
                ('exhibicion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='descriptions', to='api.exhibicion')),
            ],
        ),
        migrations.AddField(
            model_name='exhibicion',
            name='descriptions',
            field=models.ManyToManyField(blank=True, related_name='exhibitions', to='api.exhibiciondescription', verbose_name='Exhibition Descriptions'),
        ),
    ]
