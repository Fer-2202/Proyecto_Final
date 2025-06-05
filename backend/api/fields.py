from django.core.files.base import ContentFile
from rest_framework import serializers
import base64
import imghdr

class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            # base64 encoded image
            format, imgstr = data.split(';base64,')
            # Decode the base64 string to bytes
            decoded_imgstr = base64.b64decode(imgstr)
            ext = imghdr.what(None, decoded_imgstr)
            if not ext:
                raise serializers.ValidationError('Invalid image format')
            data = ContentFile(decoded_imgstr, name='temp.' + ext)

        return super(Base64ImageField, self).to_internal_value(data)