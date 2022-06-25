import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

const RegistrationStatusScreen = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [studentRegistration, setStudentRegistration] = useState();

  useEffect(() => {

  })

  return (
    <ScrollView style={{
      paddingHorizontal: 10,
      paddingTop: 10
    }}>
      <View>
        <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
          <TextInput placeholder={'Masukkan Ticket Number'} style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 4,
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderColor: 'rgba(34, 41, 47, 0.4)'
          }} />
          <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginLeft: 8,
            borderRadius: 10,
          }}>
            <Text style={{color: '#FFF'}}>Cari...</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  )
};

export default RegistrationStatusScreen;