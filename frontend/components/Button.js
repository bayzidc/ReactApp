import React, { Component } from 'react'

import { View, Text,  TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const Button = ({
    label,
    onPress }) => {
    
       
      return (
         <View>
             
                <TouchableOpacity>
                    
                    onPress={onPress}
                    
                </TouchableOpacity>
         </View>
      );
};
export default Button;