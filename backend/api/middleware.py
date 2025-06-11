import json
from django.contrib.auth import get_user_model
from .models import AuditLog
from django.utils.deprecation import MiddlewareMixin
from django.utils import timezone

User = get_user_model()

class AuditLogMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        print("AuditLogMiddleware is running")
        user = request.user if request.user.is_authenticated else None
        try:
            request_body = request.body.decode('utf-8')
            try:
                request_body = json.loads(request_body)
            except json.JSONDecodeError:
                pass
        except:
            request_body = None

        try:
            response_body = response.content.decode('utf-8')
            try:
                response_body = json.loads(response_body)
            except json.JSONDecodeError:
                pass
        except:
            response_body = None

        AuditLog.objects.create(
            timestamp=timezone.now(),
            user=user,
            action=f'{request.method} {request.path}',
            model='API Request',
            details=f'Request Body: {request_body}, Response Code: {response.status_code}, Response Body: {response_body}'
        )
        return response