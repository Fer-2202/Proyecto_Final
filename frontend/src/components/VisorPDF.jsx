import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  }
});

const VisorPDF = ({ fileUrl }) => (
  <PDFViewer width="100%" height="500px">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Este es un documento de prueba generado con react-pdf/renderer.</Text>
          <Text>URL del archivo: {fileUrl}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default VisorPDF;