from django.urls import path
from .views import PaymentsViewSet, PaymentMethodsView, DonationViewSet

""" URLs para la aplicación Payments """
urlpatterns = [
 
    # Rutas para Payments
    path('', PaymentsViewSet.as_view({'get': 'list'}), name='payments-get'),
    path('create/', PaymentsViewSet.as_view({'post': 'create'}), name='payments-create'),
    path('<int:pk>/', PaymentsViewSet.as_view({'get': 'retrieve'}), name='payments-detail'),
    path('<int:pk>/update/', PaymentsViewSet.as_view({'put': 'update'}), name='payments-update'),
    path('<int:pk>/delete/', PaymentsViewSet.as_view({'delete': 'destroy'}), name='payments-delete'),
    path('methods/', PaymentMethodsView.as_view(), name='payment-methods'),

    # Rutas para Donaciones
    path('donations/', DonationViewSet.as_view({'get': 'list'}), name='donations-list'),
    path('donations/create/', DonationViewSet.as_view({'post': 'create'}), name='donations-create'),
    path('donations/<int:pk>/', DonationViewSet.as_view({'get': 'retrieve'}), name='donations-detail'),
    path('donations/<int:pk>/update/', DonationViewSet.as_view({'put': 'update'}), name='donations-update'),
    path('donations/<int:pk>/delete/', DonationViewSet.as_view({'delete': 'destroy'}), name='donations-delete'),
]