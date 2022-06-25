import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AppTabNavigator from "./AppTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false,
        }} name={'MAIN'} component={AppTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;