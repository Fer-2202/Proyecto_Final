# Generated by Django 5.2.1 on 2025-05-28 00:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_conservationstatus_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='groups',
            new_name='roles',
        ),
    ]
