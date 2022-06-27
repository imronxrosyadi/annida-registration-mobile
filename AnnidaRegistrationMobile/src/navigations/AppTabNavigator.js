import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegistrationStatusScreen from "../screens/RegistrationStatusScreen";
import Icon from 'react-native-vector-icons/Feather';

const Tabs = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name={'HOME'} component={RegistrationScreen} options={{
        title: 'Home',
        tabBarIcon: ({focused, size, color}) => (
          <Icon name="home" size={24} color={color} />
        )
      }} />
      <Tabs.Screen name={'REGISTRATION_STATUS'} options={{
        title: 'Register Status',
        tabBarIcon: ({focused, size, color}) => (
          <Icon name="file" size={24} color={color} />
        )
      }} component={RegistrationStatusScreen} />
    </Tabs.Navigator>
  )
};

export default AppTabNavigator;