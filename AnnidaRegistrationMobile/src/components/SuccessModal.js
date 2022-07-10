import React, { useState } from "react";
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator, TouchableOpacity} from "react-native";

import Icon from 'react-native-vector-icons/Feather';


const SuccessModal = ({visible, onClose, message, ticketNumber}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={{backgroundColor: 'green', borderRadius: 100, marginBottom: 20}}>
            <Icon name={'check'} color={'white'} size={60} />

          </View>
          <Text style={{fontWeight: 'bold'}}>Berhasil</Text>
          { message &&
            <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center'}}>
              <View style={{marginTop: 0}}>
                {message}
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('AKU DI KLIK')
                  Clipboard.setString(ticketNumber);
                  Alert.alert(
                    "Info",
                    "Ticket Number sudah berhasil disalin",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                }}
              >
                <Icon name={'clipboard'} color={'#000'} size={14} style={{marginLeft: 4}} />
              </TouchableOpacity>
            </View>


          }
          <TouchableOpacity
            onPress={onClose}
            style={{backgroundColor: '#70c164', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10, marginTop: 40}}
          >
            <Text style={{fontWeight: 'bold', color: 'white'}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    minHeight: 150,
    minWidth: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  }
});

export default SuccessModal;