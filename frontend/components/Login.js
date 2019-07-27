/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Input from './Input.js';
import Button from './Button.js';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Note from './Note.js';

class Login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         auth: false,

       };
     }



login = async () => {


   fetch('http://192.168.1.20:8000/api/login/', {
method: 'POST',
headers: {
  Accept: 'application/json ',
  'Content-Type': 'application/json ',
},
body: JSON.stringify({
   'username': this.state.username,
   'password': this.state.password,
}),
})
.then(response => response.json())
      .then((responseJson)=> {

         if (responseJson.username == this.state.username){
            this.setState({auth: true});
         }
         else {
            console.log('incorrect');
         }


      })
      .catch(error=>console.log(error));
   }




   handleUsername = (text) => {
      this.setState({ username: text });
   }
   handlePassword = (text) => {
      this.setState({ password: text });
   }



   render() {
      if (this.state.auth){
         return (
           <View >
            <Note username={this.state.username}/>
           </View>
       );}
      return (
         <View style={styles.container}>
         <View style={[styles.container,{marginTop: 130 }]}>
         <Input

               placeholder = "Enter Username"
               onChangeText = {this.handleUsername}/>
               </View>
            <Input
               placeholder = "Enter Password"
               onChangeText = {this.handlePassword}
               secureTextEntry
               />
               
            <TouchableOpacity
               style={[styles.button,styles.mid]}
               onPress = {()=>{this.login();}}>
               <Text>Submit</Text>
            </TouchableOpacity>

         </View>
      );
   }
}
export default Login;

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
   },
   mid: {
      flex: 1,
      marginTop: 50,

   },
});
