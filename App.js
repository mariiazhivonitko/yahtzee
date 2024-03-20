
import { StyleSheet, Text, View } from 'react-native';
import Gameboard from './components/Gameboard';
import Home from './components/Home';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { UserContext } from './components/UserContext';
import { useContext, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Header from './components/Header';
import Footer from './components/Footer';

const Tab = createBottomTabNavigator();

export default function App() {

  const [playerName, setPlayerName] = useState('');
  const [loaded] = useFonts({
    PermanentMarker: require('./assets/fonts/PermanentMarker-Regular.ttf')
})

if (!loaded) {
  console.log('not loaded...')
  return (<Text>Loading fonts...</Text>)

} else {
  console.log('loaded!!!..')}

  return (
    
    
      <UserContext.Provider value={{playerName}}>
        <PaperProvider>
          <SafeAreaProvider>
            
            <Navigation/>
            
          </SafeAreaProvider>       
        </PaperProvider>
      </UserContext.Provider>
    )
  }

  function Navigation(){
    return (
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'information'
                  : 'information-outline';
              } else if (route.name === 'Gameboard') {
                iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
              } else if (route.name === 'Scoreboard') {
                iconName = focused ? 'view-list' : 'view-list-outline';
              }
  
              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#29307A',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Home" 
            options={{tabBarStyle:{display: 'none'}}}
            component={Home} />
          <Tab.Screen name="Gameboard" component={Gameboard} />
          <Tab.Screen name="Scoreboard" component={Scoreboard} />
        </Tab.Navigator>
      </NavigationContainer>
    );

  
  }
  



