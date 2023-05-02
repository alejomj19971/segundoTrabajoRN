import React, { createContext } from "react";
import { useState,useContext } from "react";


const  DataContext=createContext();

export function useDataContext(){
    return useContext(DataContext)
}

export function DataProvider({children}){
    
    const[listaCars,setListaCars]=useState([])
    const[listaUsers,setListaUsers]=useState([])
   
   
    const guardarCarros=(carros)=>{
        setListaCars(carros)
    }
    const guardarUsers=(users)=>{
        setListaUsers(users)
    }
    

    //Inyectamos los provider a  los componente hijo de este componente
    return(
        <DataContext.Provider value={
            {listaCars,
            listaUsers,
            guardarCarros,
            guardarUsers}}>
            {children}

        </DataContext.Provider>
    )
}



 
