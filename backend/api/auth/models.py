from django.db import models
from django.contrib.auth.models import Group, User


# User profile
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

    @property
    def role_names(self):
        return ', '.join([role.name for role in self.roles.all()])

    def add_role(self, role_name):
        role, created = Group.objects.get_or_create(name=role_name)
        self.roles.add(role)
        self.user.groups.add(role)
        self.save()

    def remove_role(self, role_name):
        role = Group.objects.get(name=role_name)
        self.roles.remove(role)
        self.user.groups.remove(role)
        self.save()

    def has_role(self, role_name):
        return self.roles.filter(name=role_name).exists() or \
               self.user.groups.filter(name=role_name).exists()

    def sync_roles_to_user(self):
        self.user.groups.set(self.roles.all())
        self.user.save()
