from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserProfile
from django.contrib.auth.models import Group

User = get_user_model()

# Sections
class Sections_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'

# Provinces
class Provinces_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Provinces
        fields = '__all__'

# Species
class Species_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'

# Conservation Status
class Conservation_Status_Serializer(serializers.ModelSerializer):
    class Meta:
        model = ConservationStatus
        fields = '__all__'

# Tickets
class Tickets_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Tickets
        fields = '__all__'

# Visits
class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = '__all__'

# Purchase Orders
class Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrders
        fields = '__all__'

# Tickets Purchase Order
class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model = TicketsPurchaseOrder
        fields = '__all__'

# Habitats
class Habitats_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Habitats
        fields = '__all__'

# Animals
class Animals_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Animals
        fields = '__all__'

# UserProfile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birth_date', 'profile_picture', 'bio', 'roles', 'province', 'created_at', 'updated_at']
        extra_kwargs = {
            'phone': {'required': False},
            'address': {'required': False},
            'birth_date': {'required': False},
            'profile_picture': {'required': False},
            'bio': {'required': False},
            'roles': {'required': False},
            'province': {'required': False},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        user = User.objects.create_user(**validated_data)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        if profile_data:
            roles = profile_data.pop('roles', [])
            province = profile_data.pop('province', None)
            profile, created = UserProfile.objects.get_or_create(user=user)
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            if province:
                profile.province = province
            profile.save()
            if roles:
                profile.roles.set(roles)
        return user

# User Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'address', 'birth_date', 'profile_picture', 'bio', 'role', 'province']
        extra_kwargs = {
            'phone': {'required': False},
            'address': {'required': False},
            'birth_date': {'required': False},
            'profile_picture': {'required': False},
            'bio': {'required': False},
            'role': {'required': False},
            'province': {'required': False}
        }

# Then define UserSerializer
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = User.objects.create_user(**validated_data)
        
        if profile_data:
            # Use get_or_create to avoid IntegrityError if profile already exists
            UserProfile.objects.get_or_create(user=user, defaults=profile_data)

        return user

# Custom Token Serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = None
        if username:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise serializers.ValidationError('No active account found with the given credentials')

        if user and user.check_password(password):
            return super().validate(attrs)
        else:
            raise serializers.ValidationError('No active account found with the given credentials')

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
      
      
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']
      
      
