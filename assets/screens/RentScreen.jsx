
import { TextInput, Button } from 'react-native-paper';
import { Text, View,StyleSheet } from "react-native";
//Fecha
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

import React from "react";

//validaciones
import { useForm, Controller, set } from "react-hook-form";
import { useState } from 'react'


let rentedCars = [
    {rentNumber:111,username:'pperez',platenumber:'AAA111',rentDate:"01/02/2023"},
    {rentNumber:121,username:'jdoe',platenumber:'BBB222',rentDate:"02/02/2023"}

  ]
  
  
  
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
        
        //Verificar fechaa
        
      const fecha = (Date.parse(rentDate))
      const fechaLista=new Date(fecha)
      console.log(fechaLista.getDate()+"/"+fechaLista.getMonth()+"/"+fechaLista.getFullYear());

      
       
         {/* 
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
        */}
        
      
        setErrorMessage ('Vehiculo Rentado con Exito')
       
      } 
  
  
      return(
          <View style={styles.container}>
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

        <View>
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



        <Button buttonColor='black' style={{marginTop:10}}  mode="contained" title="Submit" onPress={handleSubmit(onSubmit)}> Enviar </Button>
      </View>
      )
  }
  

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

  });
  
  export default RentScreen