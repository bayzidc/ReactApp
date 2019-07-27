/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";

import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({
  label,
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
