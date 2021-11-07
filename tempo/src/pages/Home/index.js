import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';


import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import api, {key} from '../../services/api';


const mylist =  [
   {
   "date": "12/03",
   "weekday": "Sex",
   "max": 26,
   "min": 17,
   "description": "Tempestades",
   "condition": "storm"
   },
   {
   "date": "13/03",
   "weekday": "Sáb",
   "max": 27,
   "min": 18,
   "description": "noite limpa",
   "condition": "clear_night"
   },
   {
   "date": "14/03",
   "weekday": "Dom",
   "max": 27,
   "min": 18,
   "description": "nublado",
   "condition": "cloud"
   },
   {
   "date": "15/03",
   "weekday": "Seg",
   "max": 26,
   "min": 18,
   "description": "dia limpo",
   "condition": "clear_day"
   },
   {
   "date": "16/03",
   "weekday": "Ter",
   "max": 27,
   "min": 17,
   "description": "neblina",
   "condition": "fog"
   },
   {
   "date": "17/03",
   "weekday": "Qua",
   "max": 28,
   "min": 18,
   "description": "chuva",
   "condition": "rain"
   },
   {
   "date": "18/03",
   "weekday": "Qui",
   "max": 25,
   "min": 18,
   "description": "chuva",
   "condition": "rain"
   },
   {
   "date": "19/03",
   "weekday": "Sex",
   "max": 23,
   "min": 19,
   "description": "dia limpo",
   "condition": "clear_day"
   },
   {
   "date": "20/03",
   "weekday": "Sáb",
   "max": 23,
   "min": 19,
   "description": "Tempestades",
   "condition": "storm"
   },
   {
   "date": "21/03",
   "weekday": "Dom",
   "max": 24,
   "min": 18,
   "description": "Tempestades",
   "condition": "storm"
   }
   ]
const result = 
  {
    "temp": 29,
    "date": "12/03/2021",
    "time": "21:45",
    "condition_code": "27",
    "description": "Tempo limpo",
    "currently": "noite",
    "cid": "",
    "city": "Embu das Artes, SP",
    "img_id": "27n",
    "humidity": 94,
    "wind_speedy": "11 km/h",
    "sunrise": "6:08 am",
    "sunset": "6:26 pm",
    "condition_slug": "clear_night",
    "city_name": "Embu das Artes",
  }

export default function Home(){

   const [isLoading, setLoading] = useState(true);
   const [dados, setData] = useState([])
   const [hasError, setHasError] = useState(null)
   const [background, setBackground] = useState(['#1ed6ff','#97c1ff']);
  
      
       useEffect(() => {

         (async ()=>{
            let {status} = await Location.requestPermissionsAsync();

            if(status !== 'granted'){
                  setHasError('Permissão negada');
                  setLoading(false);
               return;
            }

            let location = await Location.getLastKnownPositionAsync({
               accuracy: 6,
             });


            fetch (`https://api.hgbrasil.com/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
                  .then((response) => response.json())
                  .then((json) => setData(json))
                  .catch((error) => setHasError(error))
                  .finally(() => setLoading(false));


            
         })();

        if(!isLoading){
         if(dados.results.currently === 'noite'){
            setBackground(['#0c3741', '#0f2f61']);
            
               }
        }

            

       }, []);

   

    return(
     
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems:'center' , justifyContent:'center'}}>
      {isLoading ? 
       <View style={{alignItems:'center', justifyContent:'center'}}>
         <ActivityIndicator size="large" color="#1ed6ff" />
         <Text style={{alignItems:'center', justifyContent:'center', fontSize: 18}}>Carregando...</Text> 
       </View> : 
       <SafeAreaView style={styles.container}>
         
           <Menu/>
           <Header
           data={dados.results} 
           background={background}
          
           />
           
           <Conditions
            data={dados.results}
           />
           <FlatList
            horizontal={true}
            contentContainerStyle={{paddingBottom: '5%'}}
            style={styles.list}
            data={dados.results.forecast}
            keyExtractor={item => item.date}
            renderItem={({item}) => <Forecast data={item}/> }
           />
       </SafeAreaView>
      }
      </View>
    )

}

const styles = StyleSheet.create({
   container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e8f0ff',
      paddingTop: '5%',
   },
   list:{
      marginTop: 10,
      marginLeft: 10
   }, 

});