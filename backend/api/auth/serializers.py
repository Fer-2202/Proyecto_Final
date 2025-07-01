from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from .models import UserProfile, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.provinces.serializers import Provinces


# Role Serializer para mostrar información completa del rol
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


# UserProfile Serializer mejorado
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    birth_date = serializers.DateField(required=False, allow_null=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    roles = RoleSerializer(many=True, read_only=True)  # Cambiado para mostrar nombres
    user_roles = serializers.SerializerMethodField()  # Roles del User (groups)
    province = serializers.PrimaryKeyRelatedField(queryset=Provinces.objects.all(), required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birth_date', 'profile_picture', 'bio', 'roles', 'user_roles', 'province', 'created_at', 'updated_at']
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

    def get_user_roles(self, obj):
        """Obtener los roles del User (groups)"""
        if obj.user:
            return [{'id': group.id, 'name': group.name} for group in obj.user.groups.all()]
        return []

    def to_internal_value(self, data):
        ret = super().to_internal_value(data)

        if 'province' in data and data['province'] is not None:
            province_val = data['province']
            if isinstance(province_val, str):
                if province_val.isdigit():
                    ret['province'] = int(province_val)
                else:
                    try:
                        province_instance = Provinces.objects.get(name=province_val)
                        ret['province'] = province_instance.id
                    except Provinces.DoesNotExist:
                        raise serializers.ValidationError({'province': 'Provincia no encontrada.'})
            elif isinstance(province_val, dict) and 'id' in province_val:
                ret['province'] = province_val['id']
        else:
            ret['province'] = None

        return ret

    def update(self, instance, validated_data):
        # Actualizar campos del perfil
        user_data = validated_data.pop('user', {})
        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)
        if first_name is not None:
            instance.user.first_name = first_name
        if last_name is not None:
            instance.user.last_name = last_name
        instance.user.save()

        # --- FIX para province ---
        province = validated_data.get('province')
        if province is not None:
            from api.provinces.models import Provinces
            if not isinstance(province, Provinces):
                try:
                    validated_data['province'] = Provinces.objects.get(pk=int(province))
                except Exception:
                    validated_data['province'] = None
        # --- FIN FIX ---

        return super().update(instance, validated_data)


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    roles = serializers.PrimaryKeyRelatedField(
     many=True,
     queryset=Group.objects.all(),
     required=False
     )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'roles', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        roles = validated_data.pop('roles', [])

        user = User.objects.create_user(**validated_data)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        
        if roles:
            for role in roles:
                user.groups.add(role)
                user.save()

        if profile_data:
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            profile_serializer = UserProfileSerializer(
             instance=user_profile,
             data=profile_data,
             partial=True,
             context={'request': self.context.get('request')}
            )
            if not profile_serializer.is_valid():
                raise serializers.ValidationError({'profile': profile_serializer.errors})
            profile_serializer.save()

        return user

# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'address', 'birth_date', 'profile_picture', 'bio', 'roles', 'province']
        extra_kwargs = {
            'phone': {'required': False},
            'address': {'required': False},
            'birth_date': {'required': False},
            'profile_picture': {'required': False},
            'bio': {'required': False},
            'roles': {'required': False},
            'province': {'required': False}
        }


# UserSerializer con Profile opcional
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
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            profile_serializer = ProfileSerializer(instance=user_profile, data=profile_data, partial=True, context={'request': self.context.get('request')})
            if not profile_serializer.is_valid():
                raise serializers.ValidationError({'profile': profile_serializer.errors})
            profile_serializer.save()

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



# Group Serializer
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']


# Group Permissions Serializer
class GroupPermissionsSerializer(serializers.Serializer):
    permissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Permission.objects.all())