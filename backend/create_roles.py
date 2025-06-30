#!/usr/bin/env python
"""
Script para crear los roles básicos del sistema.
Ejecutar con: python manage.py shell < create_roles.py
"""

import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parque_marino.settings')
django.setup()

from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from api.auth.models import UserProfile
from api.animales.models import Animals
from api.sections.models import Sections
from api.habitats.models import Habitats
from api.tickets.models import Tickets
from api.visits.models import Visits
from api.purchase_orders.models import PurchaseOrders
from api.species.models import Species
from api.conservation_status.models import ConservationStatus
from api.provinces.models import Provinces

def create_basic_roles():
    """Crear roles básicos del sistema"""
    
    # Crear rol de administrador
    admin_group, admin_created = Group.objects.get_or_create(name='admin')
    if admin_created:
        print("✅ Rol 'admin' creado")
    else:
        print("ℹ️  Rol 'admin' ya existe")
    
    # Crear rol de cliente
    cliente_group, cliente_created = Group.objects.get_or_create(name='cliente')
    if cliente_created:
        print("✅ Rol 'cliente' creado")
    else:
        print("ℹ️  Rol 'cliente' ya existe")
    
    # Asignar permisos al administrador
    models = [
        Animals, Sections, Habitats, Tickets, Visits, 
        PurchaseOrders, Species, ConservationStatus, Provinces, UserProfile
    ]
    
    admin_permissions = []
    for model in models:
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)
        admin_permissions.extend(permissions)
    
    # Asignar todos los permisos al admin
    admin_group.permissions.set(admin_permissions)
    print(f"✅ {len(admin_permissions)} permisos asignados al rol 'admin'")
    
    # Asignar permisos básicos al cliente (solo lectura en algunos modelos)
    cliente_permissions = []
    for model in [Animals, Sections, Habitats, Species, ConservationStatus, Provinces]:
        content_type = ContentType.objects.get_for_model(model)
        view_permission = Permission.objects.filter(
            content_type=content_type,
            codename='view_' + model._meta.model_name
        ).first()
        if view_permission:
            cliente_permissions.append(view_permission)
    
    cliente_group.permissions.set(cliente_permissions)
    print(f"✅ {len(cliente_permissions)} permisos asignados al rol 'cliente'")
    
    return admin_group, cliente_group

def assign_admin_to_superuser():
    """Asignar rol de admin al superusuario"""
    from django.contrib.auth import get_user_model
    User = get_user_model()
    
    try:
        superuser = User.objects.filter(is_superuser=True).first()
        if superuser:
            admin_group = Group.objects.get(name='admin')
            superuser.groups.add(admin_group)
            print(f"✅ Rol 'admin' asignado al superusuario: {superuser.username}")
        else:
            print("⚠️  No se encontró ningún superusuario")
    except Group.DoesNotExist:
        print("❌ El grupo 'admin' no existe")

if __name__ == "__main__":
    print("🚀 Creando roles básicos del sistema...")
    admin_group, cliente_group = create_basic_roles()
    assign_admin_to_superuser()
    print("✅ Proceso completado!") 