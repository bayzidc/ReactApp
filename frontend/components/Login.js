import React, { Component } from 'react'
import Input from './Input.js'
import Button from './Button.js'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Note from './Note.js';

class Login extends Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         auth: false
       };
     }

   
   
login = async () => {
        
     
   fetch("http://127.0.0.1:8000/api/login/", {
method: 'POST',
headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({
   "username": this.state.username,
   "password": this.state.password
}),
})
.then(response => response.json())
      .then((responseJson)=> {
         
         if(responseJson.username==this.state.username){
            this.setState({auth: true})
         }
         else{
            console.log("incorrect")
         }
        
        
      })
      .catch(error=>console.log(error)) 
   } 



   
   handleUsername = (text) => {
      this.setState({ username: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   
   render() {
      if(this.state.auth){
         return( 
           <View > 
            <Note username={this.state.username}/>
           </View>
       )}
      return (
         <View style={styles.container}>
            <Input 
               
               placeholder = "Enter Username"
               onChangeText = {this.handleUsername}/>
            
            <Input 
               placeholder = "Enter Password"
               onChangeText = {this.handlePassword}
               secureTextEntry
               />
            
            <TouchableOpacity
               style={styles.button}
               onPress = {()=>{this.login()}}>
               <Text>Submit</Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Login

const styles = StyleSheet.create ({
   container: {
      alignItems: 'center',
   },
   button: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      borderWidth: 1,
      borderColor: "black",
      paddding: 10
   }
})