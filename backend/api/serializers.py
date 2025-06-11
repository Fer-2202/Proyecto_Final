from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group, Permission

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

# Payment (nuevo serializer)
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

# Purchase Orders (actualizado con Payment anidado)
class Purchase_Orders_Serializer(serializers.ModelSerializer):
    payment = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseOrders
        fields = '__all__'

    def get_payment(self, obj):
        if hasattr(obj, 'payment'):
            return PaymentSerializer(obj.payment).data
        return None

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
    
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    birth_date = serializers.DateField(required=False, allow_null=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    roles = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all(), required=False)
    province = serializers.PrimaryKeyRelatedField(queryset=Provinces.objects.all(), required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birth_date', 'profile_picture', 'bio', 'roles', 'province', 'created_at', 'updated_at']
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

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
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            profile_serializer = UserProfileSerializer(instance=user_profile, data=profile_data, partial=True, context={'request': self.context.get('request')})
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

class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = '__all__'
