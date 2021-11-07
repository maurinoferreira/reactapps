import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';

import Slider from '@react-native-community/slider';

import ClipBoard from "expo-clipboard";

import { Ionicons } from '@expo/vector-icons';

let charset = 'abcdefghijklmnopqrstuvyxwzABCDEFGHIJKLMNOPQRSTUVYXWZ0123456789';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);

  function generatePass(){

    let pass = '';

    for(i = 0, n = charset.length; i< size; i++){
        pass+= charset.charAt(Math.floor(Math.random() * n));
    };

    setPassword(pass);
  
  }

  function copyPass(){
    ClipBoard.setString(password);

    /*  Alert.alert(
        "Aviso",
        "Senha copiada com sucesso!!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )*/

      ToastAndroid.showWithGravityAndOffset("Senha copiada com sucesso!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  }


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logo.png')} />

      <Text style={styles.titulo}> {size} Caracteres  </Text>

      <View style={styles.area}>
          <Slider
            style={{height: 50}}
            minimumValue={5}
            maximumValue={15}
            minimumTrackTintColor='#ff0000'
            maximumTrackTintColor='#000'
            value={size}
            onValueChange={(valor) => setSize(valor.toFixed(0))}
          />

      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== "" && (
        <View style={styles.area }>
           <Text style={styles.password} onLongPress={copyPass}>{password}</Text>

            <View style={{position:'absolute', alignSelf: 'flex-end', justifyContent:'center',paddingBottom: 15, paddingRight: 15, paddingTop: 5}}>
              <TouchableOpacity onPress={copyPass}>
                  <Ionicons name='copy' size={35} color="gray"></Ionicons>
              </TouchableOpacity>
            </View>

       </View>

      )}  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    marginBottom: 50
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%', 
    borderRadius: 7,
  },
  button:{
    backgroundColor:'#ffa000',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25,
  },
  buttonText:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  password:{
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  }
});
