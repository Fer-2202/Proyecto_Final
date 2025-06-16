from .models import Sections

def get_all_sections():
    return Sections.objects.all()