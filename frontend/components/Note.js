import React, { Component } from 'react'

import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Input from './Input.js'
import Button from './Button.js'

class Note extends Component {
   

   constructor(props) {
      super(props);
      this.state = { 
         note: '',
        username: this.props.username
       };
     }


   addNote = async () => {     
        
   fetch("http://127.0.0.1:8000/api/add_note/", {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         "note": this.state.note,
         "username": this.state.username
      }),
      })
      .then(response => response.json())
      .then((responseJson)=> {
         
            console.log(responseJson.response)
            this.setState({note:''})
        
      })
      .catch(error=>console.log(error)) 
   } 
         

   handleNote = (text) => {
      this.setState({ note: text })
   }
   
   
   render() {
     
      return (
         <View style={styles.container}>
            
            <Text>Hello {this.props.username}</Text>
            <Input 
               placeholder = "Enter Note"
               onChangeText = {this.handleNote}/>
     
            <TouchableOpacity
               style={styles.button}
               onPress = {()=>{this.addNote()}}>
               <Text>Submit</Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Note

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