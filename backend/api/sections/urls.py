from django.urls import path
from api.sections.views import SectionsListCreateView, SectionDetailView

urlpatterns = [
    path('lista/', SectionsListCreateView.as_view(), name='sections-lista'),
    path('actualizar-editar/<int:pk>/', SectionDetailView.as_view(), name='sections-actualizar-editar'),
]