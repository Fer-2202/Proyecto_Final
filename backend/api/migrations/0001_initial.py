import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ConservationStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('LC', 'Least Concern'), ('NT', 'Near Threatened'), ('VU', 'Vulnerable'), ('EN', 'Endangered'), ('CR', 'Critically Endangered'), ('EW', 'Extinct in the Wild'), ('EX', 'Extinct')], max_length=30, unique=True, verbose_name='Conservation Status')),
            ],
            options={
                'verbose_name': 'Conservation Status',
                'verbose_name_plural': 'Conservation Statuses',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Exhibicion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=30, unique=True, verbose_name='Exhibition Value')),
                ('label', models.CharField(max_length=30, unique=True, verbose_name='Exhibition Label')),
                ('title', models.CharField(max_length=30, unique=True, verbose_name='Exhibition Title')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Exhibition Description')),
                ('facts', models.TextField(blank=True, null=True, verbose_name='Exhibition Facts')),
            ],
            options={
                'verbose_name': 'Exhibition',
                'verbose_name_plural': 'Exhibitions',
                'ordering': ['value'],
            },
        ),
        migrations.CreateModel(
            name='Provinces',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Province Name')),
            ],
            options={
                'verbose_name': 'Province',
                'verbose_name_plural': 'Provinces',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Sections',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Section Name')),
            ],
            options={
                'verbose_name': 'Section',
                'verbose_name_plural': 'Sections',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Species',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Species Name')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('img', models.ImageField(blank=True, null=True, upload_to='species/', verbose_name='Image')),
                ('scientific_name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Scientific Name')),
            ],
            options={
                'verbose_name': 'Species',
                'verbose_name_plural': 'Species',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Ticket Price')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Ticket Name')),
                ('description', models.CharField(max_length=100, verbose_name='Description')),
            ],
            options={
                'verbose_name': 'Ticket',
                'verbose_name_plural': 'Tickets',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='AuditLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('action', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('record_id', models.PositiveIntegerField(blank=True, null=True)),
                ('details', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Audit Log',
                'verbose_name_plural': 'Audit Logs',
                'ordering': ['-timestamp'],
            },
        ),
        migrations.CreateModel(
            name='ExhibicionImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='exhibitions/', verbose_name='Exhibition Image')),
                ('exhibicion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.exhibicion')),
            ],
        ),
        migrations.AddField(
            model_name='exhibicion',
            name='images',
            field=models.ManyToManyField(blank=True, related_name='exhibitions', to='api.exhibicionimage', verbose_name='Exhibition Images'),
        ),
        migrations.CreateModel(
            name='PurchaseOrders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateField(auto_now_add=True)),
                ('purchase_date', models.DateField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('email', models.EmailField(max_length=50)),
                ('qr_image', models.ImageField(blank=True, null=True, upload_to='qr_codes/')),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('PAID', 'Paid'), ('CANCELLED', 'Cancelled'), ('FAILED', 'Failed')], default='PENDING', max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchase_orders', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Purchase Order',
                'verbose_name_plural': 'Purchase Orders',
                'ordering': ['-order_date'],
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('payment_method', models.CharField(choices=[('CARD', 'Card'), ('PAYPAL', 'PayPal'), ('CASH', 'Cash')], max_length=30)),
                ('transaction_id', models.CharField(max_length=100, unique=True)),
                ('status', models.CharField(choices=[('SUCCESS', 'Success'), ('FAILED', 'Failed')], max_length=20)),
                ('purchase_order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='api.purchaseorders')),
            ],
            options={
                'verbose_name': 'Payment',
                'verbose_name_plural': 'Payments',
                'ordering': ['-payment_date'],
            },
        ),
        migrations.CreateModel(
            name='Habitats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Habitat Name')),
                ('nums_animals', models.PositiveIntegerField(verbose_name='Number of Animals')),
                ('description', models.CharField(max_length=100, verbose_name='Description')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='habitats', to='api.sections')),
            ],
            options={
                'verbose_name': 'Habitat',
                'verbose_name_plural': 'Habitats',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Animals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Animal Name')),
                ('age', models.PositiveIntegerField(verbose_name='Age')),
                ('conservation_status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animals', to='api.conservationstatus')),
                ('habitat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animals', to='api.habitats')),
                ('species', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animals', to='api.species')),
            ],
            options={
                'verbose_name': 'Animal',
                'verbose_name_plural': 'Animals',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pics/')),
                ('bio', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('province', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_profiles', to='api.provinces')),
                ('roles', models.ManyToManyField(blank=True, related_name='user_profiles', to='auth.group')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'User Profile',
                'verbose_name_plural': 'User Profiles',
            },
        ),
        migrations.CreateModel(
            name='Visits',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.DateField(verbose_name='Visit Day')),
                ('total_slots', models.PositiveIntegerField(default=1276, verbose_name='Total Slots')),
                ('occupied_slots', models.PositiveIntegerField(default=0, verbose_name='Occupied Slots')),
            ],
            options={
                'verbose_name': 'Visit',
                'verbose_name_plural': 'Visits',
                'ordering': ['-day'],
                'unique_together': {('day',)},
            },
        ),
        migrations.AddField(
            model_name='purchaseorders',
            name='visit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchase_orders', to='api.visits'),
        ),
        migrations.CreateModel(
            name='TicketsPurchaseOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveIntegerField()),
                ('purchase_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets_purchase_order', to='api.purchaseorders')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets_purchase_order', to='api.tickets')),
            ],
            options={
                'verbose_name': 'Tickets Purchase Order',
                'verbose_name_plural': 'Tickets Purchase Orders',
                'unique_together': {('ticket', 'purchase_order')},
            },
        ),
    ]
