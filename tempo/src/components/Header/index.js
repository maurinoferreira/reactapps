import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';

import {condition} from '../../utils/condition';




export default function Header({data, background}){

  let icon = condition(data.condition_slug);

  const [temp, setTemp] = useState(data.temp);
  const [scale, setScale] = useState('c');
  const [tempConv, setConvertTemp] = useState();

  

  function convertTemp(){
    if(scale == 'c'){

       const convert = (temp * 1.8) + 32;
          setConvertTemp(convert);
          setScale('f');
        }

      else{
          const convertC = (tempConv - 32) / 1.8;
          const fixedConvertC = convertC.toFixed(0);
          setTemp(fixedConvertC);
          setScale('c');
      }  

  }

  return(
    <LinearGradient 
    style={styles.header}
    colors={background}
    >
      
     
      <Text style={styles.date}>{data.date}</Text>
      <Text style={styles.city}>{data.city}</Text>
      <Ionicons
        name={icon.name}
        color='#fff'
        size={150}
      />

      <Text style={styles.descricao}>{data.description}</Text>

      
      
      <TouchableOpacity onPress={convertTemp}>
        {scale == 'c' ? <Text style={styles.temp}>{temp}°</Text> : <Text style={styles.temp}>{tempConv}°</Text>}
        
    
      </TouchableOpacity>
     

     
     

    </LinearGradient>

    
  )

}

const styles = StyleSheet.create({
    header:{
      width: '95%',
      height: '55%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      //top: -120
    },
    scales:{
      alignItems: 'center',
      color: '#fff',
      fontSize: 40, 
    

    },
    date:{
      color: '#fff',
      fontSize: 17,
      marginTop: 8
    },
    city:{
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 20
    },
    descricao:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
      marginTop: -10
    },
    temp:{
      color: '#fff',
      fontSize: 80,
      fontWeight: 'bold'
    }
});