from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#sections
class Sections_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Sections
        fields= '__all__'


#Provincias
class Provinces_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Provinces
        fields= '__all__'


#species
class Species_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Species
        fields= '__all__'


#conservation_status
class Conservation_Status_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Conservation_Status
        fields= '__all__'


#Tickets
class Tickets_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Tickets
        fields= '__all__'


#visits
class Visits_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Visits
        fields= '__all__'


#purchase_orders
class Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta: 
        model= Purchase_Orders
        fields= '__all__'


#tickets_purchase_order
class Tickets_Purchase_Orders_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Tickets_Purchase_Order
        fields= '__all__'


#habitats
class Habitats_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Habitats
        fields= '__all__'


#animals
class Animals_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Animals
        fields= '__all__'


#UsersProfile
class UsersProfile_Serializer(serializers.ModelSerializer):
    class Meta:
        model= UsersProfile
        fields= ['phone', 'address','birth_date', 'profile_picture','bio', 'role', 'province', 'created_at', 'update_at']
        extra_kwargs = {
            'phone': {'requiered': False},
            'address': {'required': False},
            'birth_date': {'required': False},
            'profile_picture': {'required': False},
            'bio': {'required': False},
            'role': {'required': False},
            'province': {'required': False},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }


#Register
class Register_Serializers(serializers.ModelSerializer):
    profile = UsersProfile_Serializer(required= False)
    class Meta:
        model = User
        fields = ['username', 'email', 'password' 'profile']
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            profile_data = validated_data.pop('profile', None)
            user = User.objects.create_user(**validated_data)
            if profile_data:
                UsersProfile.objects.get_or_create(user=user, defaults=profile_data)
            return user


#Profile
class Profile_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = UsersProfile
        fields = ['phone', 'address', 'birth_date', 'profile_picture', 'bio', 'role', 'province']
        extra_kwargs ={
            'phone': {'required': False},
            'address': {'required': False},
            'birth_date': {'required': False},
            'profile_picture': {'required': False},
            'bio': {'required': False},
            'role': {'required': False},
            'province': {'required': False}
        }


#then define Users_Serializer
class User_Serializer(serializers.ModelSerializer):
    profile = Profile_Serializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = User.objects.create_user(**validated_data)

        if profile_data:

            UsersProfile.objects.get_or_create(user=user,defaults=profile_data)
        
        return user
    

#Custom token serializer
class Custom_TokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = None
        if username:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise serializers.ValidationError('No active account with the given credentials')
            
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
    

#Group serializer
class Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']