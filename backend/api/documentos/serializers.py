from rest_framework import serializers
from .models import Documents

class DocumentsSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    tipo = serializers.SerializerMethodField()
    peso = serializers.SerializerMethodField()

    class Meta:
        model = Documents
        fields = [
            'id',
            'titulo',
            'description',
            'fecha',
            'file_type',   # útil si lo necesitas en crudo
            'file_size',   # útil si lo necesitas en crudo
            'tipo',
            'peso',
            'url',
        ]

    def get_url(self, obj):
        request = self.context.get('request')
        if obj.document and request:
            return request.build_absolute_uri(obj.document.url)
        return obj.document.url if obj.document else None

    def get_tipo(self, obj):
        return obj.file_type.upper() if obj.file_type else 'DESCONOCIDO'

    def get_peso(self, obj):
        return obj.file_size if obj.file_size else 'N/A'