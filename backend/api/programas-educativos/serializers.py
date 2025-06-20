from rest_framework import serializers
from .models import ProgramaEducativo, ProgramaItem

class ProgramaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaItem
        fields = [ 'id', 'programa', 'text']

class ProgramaEducativoSerializer(serializers.ModelSerializer):
    items = ProgramaItemSerializer(many=True, required=False)

    class Meta:
        model = ProgramaEducativo
        fields = ['id', 'title', 'description', 'image', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        programa = ProgramaEducativo.objects.create(**validated_data)
        for item_data in items_data:
            ProgramaItem.objects.create(programa=programa, **item_data)
        return programa

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', [])
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        # Elimina los ítems existentes y crea los nuevos
        instance.items.all().delete()
        for item_data in items_data:
            ProgramaItem.objects.create(programa=instance, **item_data)
        return instance