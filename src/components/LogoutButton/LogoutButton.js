import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const baseUrl = "http://192.168.1.79:8080/";

async function removeToken()
{
  await AsyncStorage.removeItem("@token");
  await AsyncStorage.removeItem("@username");
}

export default function({navigation}){
  async function handleLogout(){
        removeToken();
        navigation.navigate("Main");
  }

    return(
    <View>
    <TouchableOpacity onPress={handleLogout}>
      <View style={LogoutButton.logout_btn}>
        <Text style={LogoutButton.logout_btn_txt}>LOGOUT</Text>
      </View>
    </TouchableOpacity>
    </View>
);
}

const LogoutButton = StyleSheet.create({
    logout_btn: {
        width: 120,
        height: 30,
        backgroundColor: '#32a0db',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logout_btn_txt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }, 
    
})