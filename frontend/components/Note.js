import React, { Component } from "react";
import Geolocation from '@react-native-community/geolocation';
import BackgroundFetch from "react-native-background-fetch";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Toast,
  PermissionsAndroid
} from "react-native";
import Input from "./Input.js";
import Button from "./Button.js";


class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      username: this.props.username,
      noteAdded : false,
      locationAdded: false,
      where: { lat: null, lng: null },
      error: null,
    };
  }

  getLocation(){
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000, //20 second
      //  maximumAge: 1000 //1 second
    };

    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  componentDidMount() {

  this.getLocation();

   BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, () => {
      console.log("Received background-fetch event");

      this.getLocation();
      
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
}

geoSuccess = position => {
   console.log("setting location state");
   this.setState({
     where: { lat: position.coords.latitude, lng: position.coords.longitude },
   });
   
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.addLocation();
 };
 geoFailure = err => {
   this.setState({ error: err.message });
 };

 addLocation = async () => {
   fetch("http://192.168.0.4:8000/api/locationlog/", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       lat: this.state.where.lat,
       lng: this.state.where.lng,
       username: this.state.username,
     }),
   })
     .then(response => response.json())
     .then(responseJson => {
       console.log(responseJson.response);
       this.setState({ lat: null,lng: null, locationAdded :true });
     })
     .catch(error => console.log(error));
 };

  addNote = async () => {
    fetch("http://192.168.0.4:8000/api/add_note/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: this.state.note,
        username: this.state.username,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.response);
        this.setState({ note: "", notedAdded :true });
      })
      .catch(error => console.log(error));
  };

  handleNote = text => {
    this.setState({ note: text });
  };

  render() {

   async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'App needs access to your Location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } 
    requestLocationPermission();
    

    return (
      <View style={styles.container}>
        <Text>Hello {this.props.username}</Text>
        <Input placeholder="Enter Note" onChangeText={this.handleNote} />

        <TouchableOpacity
          style={[styles.button,{marginTop: 30}]}
          onPress={() => {
            this.addNote();
          }}
        >
          <Text style={[{marginTop: 2}]}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Note;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 140,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
});