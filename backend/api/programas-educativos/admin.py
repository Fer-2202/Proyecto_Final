from django.contrib import admin
from .models import ProgramaEducativo, ProgramaItem

class ProgramaItemInline(admin.TabularInline):
    model = ProgramaItem
    extra = 1

@admin.register(ProgramaEducativo)
class ProgramaEducativoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')
    inlines = [ProgramaItemInline]

@admin.register(ProgramaItem)
class ProgramaItemAdmin(admin.ModelAdmin):
    list_display = ('programa', 'text')