from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

# 1
from .animales.models import Animals
from .tickets_purchase.models import TicketsPurchaseOrder
from .sections.models import Sections
from .provinces.models import Provinces
from .species.models import Species
from .tickets.models import Tickets
from .purchase_orders.models import PurchaseOrders
from .payments.models import Payments
from .auth.models import UserProfile
from .conservation_status.models import ConservationStatus
from .habitats.models import Habitats
from .visits.models import Visits
from .documentos.models import Documents


User = get_user_model()

# Define an inline for the UserProfile
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'profile'

# Define a new User admin
class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Register other models
admin.site.register(Sections)
# admin.site.register(roles) # Removed custom roles model registration
admin.site.register(Provinces)
admin.site.register(Species)
admin.site.register(ConservationStatus)
admin.site.register(Tickets)
admin.site.register(Visits)
admin.site.register(PurchaseOrders)
admin.site.register(TicketsPurchaseOrder)
admin.site.register(Habitats)
admin.site.register(Animals)
admin.site.register(UserProfile) 
admin.site.register(Payments)
admin.site.register(Documents)
