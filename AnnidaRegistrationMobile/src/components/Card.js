import React from 'react';
import {View} from "react-native";

const Card = ({children}) => {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 10,
      paddingBottom: 40,
      paddingTop: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 4,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }}>
      {children}
    </View>
  )
}

export default Card;