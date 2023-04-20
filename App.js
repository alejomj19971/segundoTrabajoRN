import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importar el metodo para generar el bottom tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import ProfileScreen from './screens/ProfileScreen'
import { useState } from 'react'

let users = [
  {username:'pperez',name:'Pepe Perez',password:'111', role:1},
  {username:'jdoe',name:'John Doe',password:'222', role:2}
]
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Rutas
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeTabs'
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Sistema Prueba' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormessage, setErrorMessage] = useState('');
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Inicio de Sesión</Text>
      <Text style={{color:'red'}}>{errormessage}</Text>
      <TextInput
        label="Usuario"
        mode='outlined'
        left={<TextInput.Icon icon="account" />}
        onChangeText={username => setUsername(username)}
        value={username}
      />
      <TextInput
        style={{ marginTop: 10, marginBottom: 10 }}
        label="Contraseña"
        mode='outlined'
        right={<TextInput.Icon icon="eye" />}
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry
      />
      <Button 
        icon="door" 
        mode="contained" 
        onPress={() => {
          let uFind = users.find(user => user.username == username && user.password == password);
          if (uFind != undefined){
              const {name, username} = uFind
              setErrorMessage('')
              navigation.navigate('Contacts',{name:name,username:username})
          }
          else{
            setErrorMessage('Usuario y/o contraseña inválido (s)')
          }
        }}>
        Ingresar
      </Button>

    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'blue',
        tabBarActiveBackgroundColor: 'orange',
        headerShown: false

      }}
    >
      <Tab.Screen name="Login" component={LoginScreen} options={{
        tabBarStyle:{display:'none'},
        tabBarIcon: (tabInfo) => (<MaterialIcons name="person" size={25} />)
      }} />
      <Tab.Screen name="Contacts" component={ContactsScreen} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name="zoom-out" size={25} />)
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon: (tabInfo) => (<MaterialIcons name="contacts" size={25} />)
        }} />
    </Tab.Navigator>
  );
}

function ContactsScreen({ navigation,route }) {
  return (
    <View style={styles.container}>
      <Text>Estamos en Contáctenos</Text>
      <Text>{route.params.name}</Text>
      <Text>{route.params.username}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
