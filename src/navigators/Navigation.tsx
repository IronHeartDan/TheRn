import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import DemoScreen from '../screens/DemoScreen'


const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName='Demo'>
            <Stack.Screen name='Demo' component={DemoScreen} options={{ headerShown: true }} />
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default Navigation