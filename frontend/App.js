import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Login from './components/Login.js';
import Note from './components/Note.js';

export default class App extends Component {
  render() {
    return (
      <View>
        <Login/>
      </View>
    );
    }
  }