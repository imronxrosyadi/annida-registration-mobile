import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RegistrationScreen from "../screens/RegistrationScreen";
import RegistrationStatusScreen from "../screens/RegistrationStatusScreen";

const Tabs = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name={'HOME'} component={RegistrationScreen} options={{}} />
      <Tabs.Screen name={'REGISTRATION_STATUS'} component={RegistrationStatusScreen} />
    </Tabs.Navigator>
  )
};

export default AppTabNavigator;