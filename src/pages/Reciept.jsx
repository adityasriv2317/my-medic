import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { CheckCheck } from 'lucide-react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  amount: {
    fontSize: 22,
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 12,
  },
  label: {
    color: '#4B5563',
  },
  value: {
    color: '#111827',
    fontWeight: 'bold',
  },
  divider: {
    borderBottom: 1,
    borderBottomColor: '#D1D5DB',
    marginVertical: 10,
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 15,
    color: '#4B5563',
  },
});

const Reciept = ({ recieptData, doctor }) => {
  if (!recieptData || !doctor) return null;

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Success Icon & Text */}
        <View style={styles.header}>
          <Text style={styles.successText}>Payment Successful</Text>
        </View>

        {/* Amount */}
        <Text style={styles.amount}>₹{doctor.price}</Text>

        {/* Transaction Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>{currentDate} {currentTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>UPI</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>Completed</Text>
          </View>
        </View>

        {/* Doctor Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Doctor Name</Text>
            <Text style={styles.value}>{doctor.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Specialization</Text>
            <Text style={styles.value}>{doctor.specialization}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Consultation Fee</Text>
            <Text style={styles.value}>₹{doctor.price}</Text>
          </View>
        </View>

        {/* Appointment Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Patient Name</Text>
            <Text style={styles.value}>{recieptData.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Appointment Date</Text>
            <Text style={styles.value}>{recieptData.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Appointment Time</Text>
            <Text style={styles.value}>{recieptData.time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reason for Visit</Text>
            <Text style={styles.value}>{recieptData.reason}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.divider} />
        <Text style={styles.footer}>This is a computer-generated receipt</Text>
        <Text style={styles.footer}>For any queries, contact: support@mymedic.com</Text>
      </Page>
    </Document>
  );
};

export default Reciept;
