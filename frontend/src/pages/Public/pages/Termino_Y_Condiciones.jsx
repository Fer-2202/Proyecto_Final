import React from 'react'
import { Typography, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

function Termino_Y_Condiciones() {
  return (
    <div className="max-w-4xl mx-auto mt-23 p-6 bg-white rounded-lg shadow-md">
      <Typography>
        <Title level={2} className="text-center mb-8">
          Términos y Condiciones de Uso
        </Title>

        <Paragraph>
          <Text strong>Última actualización:</Text> [fecha]
        </Paragraph>

        <Paragraph>
          Al registrarse en el sitio web oficial del <Text strong>Parque Marino del Pacífico</Text> 
          ([nombre del sitio o dominio]), usted acepta los siguientes Términos y Condiciones de uso. 
          Le solicitamos que los lea detenidamente antes de crear una cuenta.
        </Paragraph>

        <Divider />

        <Title level={4}>1. Objeto del Sitio Web</Title>
        <Paragraph>
          El sitio tiene como finalidad brindar información sobre actividades, conservación marina,
          educación ambiental, visitas guiadas, venta de entradas y otros servicios ofrecidos por el Parque Marino.
        </Paragraph>

        <Title level={4}>2. Registro de Usuario</Title>
        <Paragraph>
          Para acceder a ciertos servicios, el usuario debe completar el registro proporcionando información veraz y actualizada.
          El usuario es responsable de proteger su contraseña y de cualquier actividad que ocurra bajo su cuenta.
        </Paragraph>

        <Title level={4}>3. Uso Aceptable</Title>
        <Paragraph>
          El usuario se compromete a utilizar el sitio con respeto y conforme a la ley. Queda estrictamente prohibido:
        </Paragraph>
        <ul className="list-disc pl-6 mb-4">
          <li>Realizar un uso indebido, fraudulento o malintencionado del sitio.</li>
          <li>Publicar contenido ofensivo o que infrinja derechos de terceros.</li>
          <li>Atentar contra la seguridad, integridad o disponibilidad de los servicios web.</li>
        </ul>

        <Title level={4}>4. Protección de Datos Personales</Title>
        <Paragraph>
          Los datos personales proporcionados se tratarán conforme a nuestra <Text strong>Política de Privacidad</Text>. 
          Serán utilizados únicamente para fines institucionales como contacto, reservaciones y envío de información educativa o informativa.
        </Paragraph>

        <Title level={4}>5. Propiedad Intelectual</Title>
        <Paragraph>
          Todos los contenidos del sitio (textos, imágenes, videos, logotipos) son propiedad del Parque Marino o de terceros autorizados.
          Queda prohibida su reproducción total o parcial sin autorización escrita.
        </Paragraph>

        <Title level={4}>6. Modificaciones y Cancelaciones</Title>
        <Paragraph>
          El Parque Marino se reserva el derecho de modificar, suspender o cancelar el acceso al sitio web o a cualquier servicio ofrecido,
          sin previo aviso, por razones operativas, legales o de seguridad.
        </Paragraph>

        <Title level={4}>7. Contacto</Title>
        <Paragraph>
          Para consultas, sugerencias o solicitudes, puede contactarnos por los siguientes medios:
        </Paragraph>
        <ul className="pl-6 list-none">
          <li>📧 Correo electrónico: <Text strong>[correo institucional]</Text></li>
          <li>📞 Teléfono: <Text strong>[teléfono de contacto]</Text></li>
        </ul>
      </Typography>
    </div>
  )
}

export default Termino_Y_Condiciones
