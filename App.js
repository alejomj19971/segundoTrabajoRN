//Vista
import { StyleSheet, Text, FlatList,SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importar el metodo para generar el bottom tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MostrarLista, {} from './assets/screens/MostrarLista'

//Librerias React y otras
import React from "react";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";



//Bases de datos

const cars=[{platenumber:'AAA111',brand:'MAZDA',state:false},
            {platenumber:'BBB222',brand:'BMW',state:true}]

const rentedCars = [
              {rentNumber:'111',username:'pperez',plateNumber:'AAA111',rentDate:"01/02/2023"},
              {rentNumber:'121',username:'jdoe',plateNumber:'BBB222',rentDate:"02/02/2023"}
            ]            

            
const users = [
  {username:'pperez',name:'Pepe Perez',password:'a111', role:1},
  {username:'jdoe',name:'John Doe',password:'a222', role:2}
]



//Termina bases de datos

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Rutas
 
   
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeTabs'
      >

        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Alquiler de Autos' }} />
        <Stack.Screen name="Registrar" component={Registrar} options={{ title: 'Nuevo Usuario' }} />
        <Stack.Screen name="ListCar" component={ListCar} options={{ title: 'Lista de Autos' }} />

      </Stack.Navigator>
    </NavigationContainer>
  
   
  );
}

//Componente Login y Register


const Registrar= ({navigation})=> {
   
  const [errormessage, setErrorMessage] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
      username: '',
      name: '',
      password:'',
      passwordRep:''
      }
  });
  const onSubmit = data =>{
    const {username,name,password,passwordRep}=data

    //Comparar password de los formularios
    if(password!=passwordRep){
      setErrorMessage('Las contraseñas no son iguales')
      return
    }else{
      setErrorMessage('')
    }
    
    let estado=false;
    users.forEach(user=>{
      if(user.username==username){
        setErrorMessage('Este Usuario ya existe');
        estado=true
    }
       
    })

      
    if(estado==false){
      users.push({username,name,password})
      setErrorMessage('Usuario Registrado')
      setTimeout(()=>{
        navigation.navigate('Login')
      },2000)
      console.log(users)
    }
   
  } 


  return(
      <View style={styles.container}>
       <Text style={{color:'black',fontSize:25,fontWeight:'bold',textTransform:'capitalize'}}>Registrate</Text>
    <Text style={{color:'red',fontSize:12,fontWeight:'bold',textTransform:'uppercase'}}>{errormessage}</Text>
    <Controller
      control={control}
      rules={{
       required: true,
       pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Username"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{marginTop:10}}
          left={<TextInput.Icon icon="account" />}
        />
      )}
      name="username"
    />
    {errors.username?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
    {errors.username?.type==='pattern' && <Text>Escribe un username solo con letras y numeros</Text>}


      {/*Name */}
      <Controller
      control={control}
      rules={{
       required: true,
       pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Name"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{marginTop:10}}
          left={<TextInput.Icon icon="nature-people" />}
        />
      )}
      name="name"
    />
    {errors.name?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
    {errors.name?.type ==='pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}
    



      {/*Password*/}

    <Controller
      control={control}
      rules={{
       maxLength: 100,
       required:true,
       pattern:/(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g

      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Password"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{marginTop:10}}
          secureTextEntry
          left={<TextInput.Icon icon="key" />}
       
        />
      )}
      name="password"
    />
    {errors.password?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.password?.type==="pattern" && <Text>El Password Debe contener  números y letras</Text>}

        
      {/* Repetir Password*/}

    <Controller
      control={control}
      rules={{
      maxLength: 100,
      required:true,
      pattern:/(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Repite tu Password"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{marginTop:10}}
          secureTextEntry
          left={<TextInput.Icon icon="key" />}
        />
      )}
      name="passwordRep"
    />
    {errors.passwordRep?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.passwordRep?.type==="pattern" && <Text>El Password debe contener  números y letras</Text>}


        {/* */}

    <Button buttonColor='orange' textColor='white' style={{marginTop:10,width:280,fontSize:15}}  mode="contained" title="Submit" icon='car-convertible' onPress={handleSubmit(onSubmit)}> Enviar </Button>
  </View>
  )
}


function LoginScreen({ navigation }) {
const [errormessage, setErrorMessage] = useState('');


const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
    username: '',
    password:''
    }
  });


const onSubmit = data =>{
  const {password,username}=data
  let uFind = users.find(user => user.username == username && user.password == password);
  if (uFind != undefined){
      const {name, username} = uFind
      setErrorMessage('')
      navigation.navigate('CarScreen',{name:name,username:username})
  }
  else{
    setErrorMessage('Usuario y/o contraseña inválido (s)')
  }

}


return (
  <View style={[styles.container]}>
    <Text style={{ marginBottom: 10,fontSize:25,fontWeight:'bold' }}>Inicio de Sesión</Text>
    <Text style={{color:'red'}}>{errormessage}</Text>




           {/*Name */}
      <Controller
      control={control}
      rules={{
       required: true,
       pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Username"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{marginTop:10}}
          left={<TextInput.Icon icon="account" />}
          
        />
      )}
      name="username"
    />
    {errors.username?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
    {errors.username?.type ==='pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}


    
      {/*Password */}
      <Controller
      control={control}
      rules={{
       required: true,
       pattern:/(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Password"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry
          style={{marginTop:10}}
          left={<TextInput.Icon icon="key" />}
        />
      )}
      name="password"
    />
    {errors.password?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.password?.type==="pattern" && <Text>El Password Debe contener  números y letras</Text>}



    <Button 
      icon="door" 
      mode="contained" 
      buttonColor='black'
      textColor='white'
      onPress={handleSubmit(onSubmit)}
      style={{marginTop:10,width:250}}
      >
      Ingresar
    </Button>

    <Button style={{marginTop:10,width:250}} onPress={()=>{navigation.navigate('Registrar')}} buttonColor='orange' textColor='white' icon="car-arrow-right">Registrar</Button>

  </View>
);
}


//Componente RentScreen
const RentScreen= ({navigation})=> {
  // const [inputDate, setInputDate] = React.useState(undefined)
   const [errormessage, setErrorMessage] = useState('');
   const [errorFecha, setErrorFecha] = useState('');

   const { control, handleSubmit, formState: { errors } } = useForm({
       defaultValues: {
       rentNumber: '',
       username: '',
       plateNumber:'',
       rentDate:''
       }
   });

   const onSubmit = data =>{

     const {username,rentNumber,plateNumber,rentDate}=data
     
   
     //Verificar si usuario existe
     let usuarioExiste= users.some(user=>user.username==username)
     if(!usuarioExiste){
      setErrorMessage('El Usuario No existe')
      return
     }else{
      setErrorMessage('')
    }

     //Verificar que el auto este disponible y exista

        let autoDisponible= cars.some(car=>car.platenumber==plateNumber && car.state==true)
        if(!autoDisponible){
        setErrorMessage('El auto no esta disponible, o no existe')
        return
        }else{
          setErrorMessage('')
        }

        // Comprobar el número de la factura
        let existeFactura=rentedCars.some(rented=>rented.rentNumber==rentNumber)
        if(existeFactura){
          setErrorMessage('Este número de factura no es válido')
          return
        }else{
          const fecha = (Date.parse(rentDate))
          let fechaLista=new Date(fecha)
          fechaLista=fechaLista.getDate()+"/"+fechaLista.getMonth()+"/"+fechaLista.getFullYear()
          rentedCars.push({
            rentNumber,
            username,
            plateNumber,
            rentDate:fechaLista
          
        })
          setErrorMessage('Proceso exitoso, Disfrute su Auto')
        }
            
      
       

        // Cambiar el estado del auto a false
        cars.forEach(car=>{
          if(car.platenumber==plateNumber){
            car.state=false
            return
          }
        })
        setErrorMessage ('Vehiculo Rentado con Exito')
         
        
      
      
      
      
      
      }

   return(
       <View style={styles.container}>
        <Text style={{color:'black',fontSize:20,fontWeight:'bold',textTransform:'uppercase',marginTop:10,marginBottom:10}}>Renta un Auto</Text>
     <Text style={{color:'red',fontSize:12,fontWeight:'bold',textTransform:'uppercase'}}>{errormessage}</Text>

        {/*Rent Number*/}
       
    <Controller
       control={control}
       rules={{
        required: true,
        pattern:/^[0-9]+$/g
       }}
       render={({ field: { onChange, onBlur, value } }) => (
         <TextInput
           placeholder="Rent Number"
           onBlur={onBlur}
           onChangeText={onChange}
           value={value}
           left={<TextInput.Icon icon="car-info" />}
           style={{marginTop:10}}
         />
       )}
       name="rentNumber"
     />
     {errors.rentNumber?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
     {errors.rentNumber?.type==='pattern' && <Text>Por favor verifique que solo escribio números</Text>}







    {/*username*/}
    <Controller
       control={control}
       rules={{
        required: true,
        pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
       }}
       render={({ field: { onChange, onBlur, value } }) => (
         <TextInput
           placeholder="Username"
           onBlur={onBlur}
           onChangeText={onChange}
           value={value}
           left={<TextInput.Icon icon="account" />}
           style={{marginTop:10}}
         />
       )}
       name="username"
     />
     {errors.username?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
     {errors.username?.type==='pattern' && <Text>Escribe un username solo con letras y numeros</Text>}


       {/*plateNumber */}
       <Controller
         control={control}
         rules={{
         required: true,
         minLenght: 6,
         maxLength:6,
         pattern:/[A-Z]{3}[0-9]{3}/g
         }}
         render={({ field: { onChange, onBlur, value } }) => (
         
         <TextInput
           placeholder="Plate Number"
           onBlur={onBlur}
           onChangeText={onChange}
           value={value}
           left={<TextInput.Icon icon="license" />}
           style={{marginTop:10}}
         />
       )}
       name="plateNumber"
     />
     {errors.plateNumber?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
     {errors.plateNumber?.type==="pattern" && <Text>La placa debe tener 3 letras mayúsculas y 3 números ejm :"DDD-123"</Text>}
     {errors.plateNumber?.type==="maxLength" && <Text>La placa tiene máximo 6 caracteres </Text>}
     {errors.plateNumber?.type==="minLenght" && <Text>La placa tiene mínimo 6 caracteres </Text>}


   <Controller
         control={control}
         rules={{
         required: true,
       
         }}
         render={({ field: { onChange, onBlur, value } }) => (

     <View 
     style={{marginTop:10}}>
     <SafeAreaProvider>
     <DatePickerInput
       locale="es"
       label="Date"
       value={value}
       onChange={onChange}
       inputMode="start"
     />
     </SafeAreaProvider>
     </View>
    
     )}
       name="rentDate"
     />
     {errors.rentDate?.type==="required" && <Text>Este Campo es Obligatorio</Text>}



     <Button buttonColor='black' textColor='white' style={{marginTop:10,width:270,fontSize:15}}  mode="contained" title="Submit" icon="car-pickup" onPress={handleSubmit(onSubmit)}> Enviar </Button>
   </View>
   )
  }


//Car Screen
const CarScreen=({navigation})=>{

    
    

  const [errormessage,setErrorMessage]=useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
      platenumber: '',
      brand: '',
      state:true
      }
  });
  const onSubmit = data => {

    const {platenumber,brand} =data

    let estado=false;
    cars.forEach(car=>{
      if(car.platenumber==platenumber){
        setErrorMessage('Esta Placa ya esta Registrada');
        estado=true
    }
       
    })

      
    if(estado==false){
      cars.push({platenumber,brand,state:true})
      setErrorMessage('Vehículo Registrado')
     /* setTimeout(()=>{
        navigation.navigate('Car')
      },2000)*/
      
    }
  };


  return(

    <View style={styles.container}>
    <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginBottom:15,marginTop:10}}>Agrega o Consulta Vehículos</Text>
    <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>{errormessage}</Text>
    <Controller
      control={control}
      rules={{
       required: true,
       minLenght: 6,
       maxLength:6,
       pattern:/[A-Z]{3}[0-9]{3}/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Plate Number"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          left={<TextInput.Icon icon="license" />}
          style={{marginTop:10}}
        />
      )}
      name="platenumber"
    />
    {errors.platenumber?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.platenumber?.type==="pattern" && <Text>La placa debe tener 3 letras mayúsculas y 3 números ejm :"DDD-123"</Text>}
    {errors.platenumber?.type==="maxLength" && <Text>La placa tiene máximo 6 caracteres </Text>}
    {errors.platenumber?.type==="minLenght" && <Text>La placa tiene mínimo 6 caracteres </Text>}


    <Controller
      control={control}
      rules={{
        required:true,
        pattern:/^[a-zA-Z ]+[^0-9]$/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Brand"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          left={<TextInput.Icon icon="factory" />}
          style={{marginTop:10}}

        />
      )}
      name="brand"
    />
     {errors.brand?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
     {errors.brand?.type==="pattern" && <Text>La Marca solo permite letras</Text>}
 

    <Button buttonColor='black' textColor='white' style={{marginTop:10,width:270,textTransform:'capitalize',fontSize:15}}  mode="contained" title="Submit" icon='car-limousine' onPress={handleSubmit(onSubmit)}> Guardar</Button>

    <Button style={{marginTop:10,width:270,textTransform:'capitalize',fontSize:15}} onPress={()=>{navigation.navigate('ListCar')}} buttonColor='orange' textColor='white' icon="format-list-text">Lista de Autos</Button>
  </View>
  )
}

const ListCar=()=>{
  const [listaCarros,setListaCarros]=useState({});
  

    const mostrarDisponibles=()=>{
    setListaCarros(cars.filter(car=>car.state==true))
    
  }

    const mostrarNoDisponibles=()=>{
    setListaCarros(cars.filter(car=>car.state==false))
    
  }
  


  return(

    <View style={styles.container}>
    <Text style={{fontSize:20,fontWeight:'bold',textTransform:'capitalize'}}>Seleccione los carros que desea consultar</Text>

      <FlatList 
        data={listaCarros}
        renderItem={({item})=><MostrarLista car={item}/>} 
        keyExtractor={item=>item.platenumber}
        />
    
  
    
    
    <Button textColor='white'  style={{fontSize:15,marginTop:10,width:270}}  mode='outlined' buttonColor='orange' icon="car-door" onPress={mostrarDisponibles}>Disponible</Button>
    
    <Button textColor='white' icon="car-door-lock"  style={{fontSize:15,marginTop:10,width:270}} mode='outlined' buttonColor='black' onPress={mostrarNoDisponibles}>No Disponible</Button>
    </View>



  )

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
        <Tab.Screen  name="Login" component={LoginScreen} options={{
          tabBarStyle:{display:'none'},
          tabBarIcon: (tabInfo) => (<MaterialCommunityIcons color='black' name="close" size={25} />)
        }} />
        <Tab.Screen  name="RentScreen" component={RentScreen} options={{
          tabBarIcon: (tabInfo) => (<MaterialCommunityIcons color='black' name="cash" size={25} />)
        }} />
        <Tab.Screen   name="CarScreen" component={CarScreen}
          options={{
            tabBarIcon: (tabInfo) => (<MaterialCommunityIcons  color='black' name="car" size={25} />)
          }} />
      </Tab.Navigator>

    
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
