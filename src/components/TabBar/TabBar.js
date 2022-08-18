import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import TabBarStyle from "./TabBarStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';


const TabBar = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      async function getToken(){
        await AsyncStorage.getItem("@username").then(res => setUsername(JSON.parse(res)))
        await AsyncStorage.getItem("@token").then(res=>setToken(JSON.parse(res)))
        }
        getToken();
    }, [])
  );
   return(
    <View style={TabBarStyle.tabBar}>
      <Image style={TabBarStyle.tab_icon} source={require("../../images/logo-light.png")}/>
      {
        token === null &&
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <View style={TabBarStyle.login_btn}>
          <Text style={TabBarStyle.login_btn_txt}>LOGIN/REGISTER</Text>
        </View>
      </TouchableOpacity>
      }
      {
        token !==null &&
      <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
        <View style={TabBarStyle.login_btn}>
          <Image style={{width: 25, height: 25, marginRight: 10}} source={require("../../images/profile-icon.png")}/>
          <Text style={TabBarStyle.login_btn_txt}>{username}</Text>
        </View>
      </TouchableOpacity>
      }
  </View>)
}

export default TabBar;