
from rest_framework import serializers
from .models import ServiciosEducativos, ServiciosEducativosImage, ServiciosEducativosFacts, ServiciosEducativosDescription, ServiciosEducativosButtons

class ServiciosEducativosImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ServiciosEducativosImage
        fields = ['id', 'servicios_educativos', 'image', 'created_at', 'updated_at']

class ServiciosEducativosFactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiciosEducativosFacts
        fields = ['id', 'servicios_educativos', 'fact']

class ServiciosEducativosDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiciosEducativosDescription
        fields = ['id', 'servicios_educativos', 'description']
        
class ServiciosEducativosButtonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiciosEducativosButtons
        fields = ['id', 'servicios_educativos', 'label', 'link']

class ServiciosEducativosSerializer(serializers.ModelSerializer):
    facts = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    descriptions = serializers.SerializerMethodField()
    buttons = serializers.SerializerMethodField()
    class Meta:
        model = ServiciosEducativos
        fields = '__all__'

    def get_facts(self, obj):
        return [fact.fact for fact in obj.facts.all()]
       
    def get_images(self, obj):
        request = self.context.get('request')
        images = obj.images.all()
        if request is not None:
            return [request.build_absolute_uri(image.image.url) for image in images]
        return [image.image.url for image in images]

    def get_descriptions(self, obj):
        return [desc.description for desc in obj.descriptions.all()]
       
    def get_buttons(self, obj):
        return [{'label': button.label, 'link': button.link} for button in obj.buttons.all()]
       
