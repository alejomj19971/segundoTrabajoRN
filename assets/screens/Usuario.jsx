
import { TextInput, Button } from 'react-native-paper';
import { Text, View, Alert,StyleSheet } from "react-native";

//validaciones
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react'


let users = [
  {username:'pperez',name:'Pepe Perez',password:'a111', role:1},
  {username:'jdoe',name:'John Doe',password:'a222', role:2}
]



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
            secureTextEntry
         
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
            secureTextEntry
          />
        )}
        name="passwordRep"
      />
      {errors.passwordRep?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
      {errors.passwordRep?.type==="pattern" && <Text>El Password debe contener  números y letras</Text>}


          {/* */}

      <Button buttonColor='black' style={{marginTop:10}}  mode="contained" title="Submit" onPress={handleSubmit(onSubmit)}> Enviar </Button>
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
    console.log(data)
  }


  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Inicio de Sesión</Text>
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
            
          />
        )}
        name="password"
      />
      {errors.password?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
      {errors.password?.type==="pattern" && <Text>El Password Debe contener  números y letras</Text>}


  
      <Button 
        icon="door" 
        mode="contained" 
        onPress={handleSubmit(onSubmit)}>
        Ingresar
      </Button>

      <Button style={{marginTop:10}} onPress={()=>{navigation.navigate('Registrar')}} buttonColor='yellow' icon="door">Registrar</Button>

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
  

export {

  Registrar,LoginScreen

} 