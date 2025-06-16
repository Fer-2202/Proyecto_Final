from .models import Provinces

def get_all_sections():
    return Provinces.objects.all()