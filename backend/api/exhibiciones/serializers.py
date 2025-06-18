
from rest_framework import serializers
from .models import Exhibicion, ExhibicionImage, ExhibicionFacts, ExhibicionDescription, ExhibicionButtons

class ExhibicionImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExhibicionImage
        fields = ['id', 'exhibicion', 'image', 'created_at', 'updated_at']

class ExhibicionFactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibicionFacts
        fields = ['id', 'exhibicion', 'fact']

class ExhibicionDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibicionDescription
        fields = ['id', 'exhibicion', 'description']
        
class ExhibicionButtonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibicionButtons
        fields = ['id', 'exhibicion', 'label', 'link']

class ExhibicionSerializer(serializers.ModelSerializer):
    facts = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    descriptions = serializers.SerializerMethodField()
    buttons = serializers.SerializerMethodField()
    class Meta:
        model = Exhibicion
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
       
