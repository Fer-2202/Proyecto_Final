import TransparenciaHero from "@components/home/quienes-somos/TransparenciaHero";
import ExhibitIntro from "@components/home/exhibiciones-y-servicios/components/ExhibitIntro";
import TabsContainer from "@components/home/acuicultura-y-biotecnologia/components/TabsContainer";
import TabFinanzas from "@components/home/quienes-somos/TransparenciaTabs";
import TabOrganigramaTestimonios from "@components/home/quienes-somos/TabOrganigramaTestimonios";
import TabCertificaciones from "@components/home/quienes-somos/TabCertificaciones";
import TabPreguntasYFormulario from "@components/home/quienes-somos/TabPreguntasYFormulario";
import TabDocumentos from "@components/home/quienes-somos/TabDocumentos";
import TabPoliticas from "@components/home/quienes-somos/TabPoliticas";
import TabInformes from "@components/home/quienes-somos/TabInformes";
import bgImage from "@assets/placeholder.svg";

function Transparencia_Institucional() {

  const TransparenciaTabs = [
    {
      value: "info-financiera",
      label: "Información Financiera",
      component: <TabFinanzas/>
    },
    {
      value: "info-y-memoria",
      label: "Informes y Memorias",
      component: <TabInformes/>
    },
    {
      value: "organigrama",
      label: "Organigrama y Testimonios",
      component: <TabOrganigramaTestimonios />
    },
    {
      value: "politicas",
      label: "Políticas Institucionales",
      component: <TabPoliticas />
    },
    {
      value: "documentos",
      label: "Centro de Documentación",
      component: <TabDocumentos />
    },
    {
      value: "certificaciones",
      label: "Certificaciones",
      component: <TabCertificaciones />
    },
    {
      value: "preguntas",
      label: "Preguntas Frecuentes y Solicitudes",
      component: <TabPreguntasYFormulario />
    }
  ]

  return (
    <div className="mt-24">
      <TransparenciaHero
        title="Transparencia"
        subtitle="Comprometidos con la rendición de cuentas y la gestión responsable"
        bgImage={bgImage}
        buttons={[
          {
            text: "Descargar informes",
            onClick: () => alert("Descargando..."),
            primary: true,
          },
          {
            text: "Solicitar Información",
            onClick: () => alert("Abriendo formulario..."),
          },
          {
            text: "Suscribirse a Actualizaciones",
            onClick: () => alert("Suscripción completada."),
          },
        ]}
        cards={[
          {
            title: "Documentos",
            description: "Informes legales y administrativos.",
            icon: "📄",
          },
          {
            title: "Transparencia",
            description: "Datos abiertos y rendición de cuentas.",
            icon: "🔍",
          },
          {
            title: "Auditorías",
            description: "Resultados de auditorías internas y externas.",
            icon: "📊",
          },
          {
            title: "Índice de Información",
            description: "Accede al índice completo de documentos.",
            icon: "📚",
          },
        ]}/>

      <ExhibitIntro title={"Transparencia Institucional"} description={"En el Parque Marino Central del Pacifico Sur estamos comprometidos con la transparencia y la rendición de cuentas. Creemos que es fundamental que nuestros donantes, colaboradores y el público en general tengan acceso a información clara sobre nuestra gestión financiera, administrativa y operativa."} />

      <TabsContainer tabs={TransparenciaTabs}   />
    </div>
  );
}

export default Transparencia_Institucional;
