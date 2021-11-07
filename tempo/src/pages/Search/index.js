import React, {useState} from 'react';
import {ActivityIndicator,Keyboard,Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather, Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {key} from '../../services/api';


import {condition} from '../../utils/condition';
import Conditions from '../../components/Conditions';


export default function Search(){
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [dados, setData] = useState([]);
  const [background, setBackground] = useState(['#1ed6ff','#97c1ff']);
  

  async function handleSearch(){
  
    if(dados.length > 0){
        setData([]);
    }

      await fetch (`https://api.hgbrasil.com/weather?key=${key}&city_name=${input}`)
                  .then((response) => response.json())
                  .then((json) => setData(json))
                  .catch((error) => setHasError(error))
                  .finally(() => setLoading(false));
     
      
        if(dados.by === 'default'){
            setError("Humm, cidade não encontrada! ");
            setInput('');
            
        }

        if(!isLoading){
          if(dados.results.currently === 'noite'){
             setBackground(['#0c3741', '#0f2f61']);
                }
         }
       
        setInput('');
        Keyboard.dismiss();

        
 

  }


  
   


    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.navigate('Home')}>
          <Feather 
            name='chevron-left'
            size={32}
            color='#000'
          />

          <Text style={{fontSize: 22}}>Voltar </Text>

        </TouchableOpacity>

        <View style={styles.searchBox}>
          <TextInput style={styles.input}
            value={input}
            onChangeText={(valor)=> setInput(valor)}
            placeholder="Ex: São Paulo, SP"
          />

          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
              <Feather
                name='search'
                size={22}
                color="#fff"
              />

          </TouchableOpacity>

        </View>

         
         {error && <Text style={{fontSize: 18, marginTop: 25, alignItems: 'center'}}>{error}</Text>}
                
          
          {!isLoading && 
            <LinearGradient 
            style={styles.header}
            colors={background}>

          <Text style={styles.date}>{dados.results.date}</Text>
          <Text style={styles.city}>{dados.results.city}</Text>


          <Text style={styles.descricao}>{dados.results.description}</Text>

          <Text style={styles.temp}>{dados.results.temp}°c</Text>

          <Conditions data={dados.results} style={{marginBottom: '-10%'}}/>

      </LinearGradient> 
       
          }
         

      </SafeAreaView>

    )


}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'center',
      paddingTop: '10%',
      backgroundColor: '#e8f0ff', 
     
    },
    backButton:{
      flexDirection: 'row',
      marginLeft: 15,
      alignSelf: 'flex-start',
      alignItems: 'center',
      marginBottom: 10
    },
    searchBox:{
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#ddd',
      width: '90%',
      height: 50,
      borderRadius: 8
    },
    header:{
      marginTop: '5%',
      width: '90%',
      paddingTop: '3%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 8,
      paddingBottom: '3%'
     
      //top: -120
    },
    input:{
      width: '85%',
      height: 50,
      backgroundColor: '#fff',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      padding: 7
    },
    icon:{
      width: '15%',
      height: 50,
      backgroundColor: '#1ed6ff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 8,
      borderBottomRightRadius: 8
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
      
    },
    temp:{
      color: '#fff',
      fontSize: 90,
      fontWeight: 'bold'
    }


});