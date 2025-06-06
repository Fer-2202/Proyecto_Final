from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import (Sections, Provinces, Species, ConservationStatus,
                         Tickets, Visits, PurchaseOrders, TicketsPurchaseOrder,
                         Habitats, Animals, UserProfile)

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
admin.site.register(UserProfile) # Also register the UserProfile model itself
