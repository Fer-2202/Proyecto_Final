from django.db import models
from django.contrib.auth.models import Group, User

# Perfil del Usuario
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    roles = models.ManyToManyField(Group, blank=True, related_name='user_profiles')
    province = models.ForeignKey('Provinces', on_delete=models.SET_NULL, null=True, blank=True, related_name='user_profiles')

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f'{self.user.username} Profile'