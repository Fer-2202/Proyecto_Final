# utils.py (puedes crear este archivo dentro de tu app)
import qrcode
import os
from django.conf import settings

def generate_qr_code(purchase_order):
    qr_data = f"Order ID: {purchase_order.id} | Email: {purchase_order.email} | Date: {purchase_order.purchase_date}"
    img = qrcode.make(qr_data)

    qr_dir = os.path.join(settings.MEDIA_ROOT, 'qr_codes')
    os.makedirs(qr_dir, exist_ok=True)

    file_name = f"qr_order_{purchase_order.id}.png"
    file_path = os.path.join(qr_dir, file_name)

    img.save(file_path)

    # Actualiza el campo de imagen en la orden
    purchase_order.qr_image = f"qr_codes/{file_name}"
    purchase_order.save(update_fields=['qr_image'])