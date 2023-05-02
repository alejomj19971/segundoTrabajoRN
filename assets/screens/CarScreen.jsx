
import { TextInput, Button } from 'react-native-paper';
import { Text,View,StyleSheet } from "react-native";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";


const cars=[{platenumber:'AAA111',brand:'MAZDA',state:true},
            {platenumber:'BBB222',brand:'BMW',state:true}]

            

const CarScreen=()=>{

    
    

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
        console.log(cars)
      }
    };


    return(

      <View style={styles.container}>
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
            
          />
        )}
        name="brand"
      />
       {errors.brand?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
       {errors.brand?.type==="pattern" && <Text>La Marca solo permite letras</Text>}
   

      <Button buttonColor='black' style={{marginTop:10}}  mode="contained" title="Submit" onPress={handleSubmit(onSubmit)}> GUARDAR</Button>
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
  

export default CarScreen