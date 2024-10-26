import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


export default function MyDocument({movieTitle, seatDetail, seatDetail2, movie_timing}) {
   
  return (
    <>
  {console.log(movieTitle)}
  {console.log(seatDetail)}
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
         Movie Title:{movieTitle}
          </Text>
        </View>
        <View style={styles.section}>
        <Text>{seatDetail}</Text>
        </View>
        <View style={styles.section}>
          <Text>  Movie_Timing: {movie_timing}</Text>
        </View>
        <View style={styles.section}>
          <Text> Total Cost:{seatDetail2}   </Text>
        </View>
      </Page>
    </Document>
    </>
   
  );
}
