import {Text} from 'react-native-paper'
import {View} from 'react-native'
import { useState } from 'react'

function MostrarLista({car}) {
 const {platenumber,brand,state}=car
  return (
    <View style={{backgroundColor:'antiquewhite ',borderWidth:1,borderRadius:20,padding:10,alignItems:'center',marginTop:10,width:270}}>
        
        <Text style={{marginTop:10,fontWeight:'bolder',fontSize:15,color:'black'}}>Automovil</Text>
        <Text style={{marginTop:10,fontWeight:'bolder',fontSize:15,color:'black'}}>Placa  : {platenumber}</Text>
        <Text style={{marginTop:10,fontWeight:'bolder',fontSize:15,color:'black'}}>Marca  : {brand}</Text>
        <Text style={{marginTop:10,fontWeight:'bolder',fontSize:15,color:'black'}}>Estado  : {state ? 'Disponible' :'No disponible'}</Text>
        
    </View>
  )
}

export default MostrarLista