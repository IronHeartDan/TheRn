import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import Navigation from './src/navigators/Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


function App(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Navigation />
          </SafeAreaView>
        </PaperProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default App