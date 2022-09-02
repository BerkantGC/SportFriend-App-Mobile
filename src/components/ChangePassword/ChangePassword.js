import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image, BackHandler, Alert } from "react-native";

import ChangePasswordStyle from "./ChangePasswordStyle";

const baseUrl = "https://gamessatis-backend.herokuapp.com/"

const removeItem= async() => {
    await AsyncStorage.removeItem("@token")
    await AsyncStorage.removeItem("@username")
}

export default function(props){
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error,setError] = useState(null);
    const [checkPassword, setCheckPassword] = useState("");

    
    const handleChangePassword = async() => {
    const token = JSON.parse(await AsyncStorage.getItem("@token"));
    const changePasswordModel = {
        "oldPassword": oldPassword,
        "newPassword": newPassword 
    };

    await axios.put(baseUrl + "change_password", changePasswordModel, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res=> {console.log(res); 
            removeItem();
            props.navigation.navigate("Login")
        })
        .catch(err=> Alert.alert(err));
}

    return(
        <View style={ChangePasswordStyle.centerView}>
            <TouchableOpacity onPress={props.modalVisibleUpdate} style={{position: 'absolute', right: 20, top: 40}} >
                <Image style={{width: 25, height: 25}} tintColor="white" source={require("../../images/close-button.png")}/>
            </TouchableOpacity>
            <View style={ChangePasswordStyle.container}>
                <Text style={ChangePasswordStyle.title}>CHANGE PASSWORD</Text>
                <View  style={ChangePasswordStyle.each_container}>
                    <Text style={ChangePasswordStyle.subtitle}>Old Password:</Text>
                    <TextInput onChangeText={(val)=> setOldPassword(val)} secureTextEntry={true} style={ChangePasswordStyle.input}></TextInput>
                </View>
                <View style={ChangePasswordStyle.each_container}>
                    <Text style={ChangePasswordStyle.subtitle}>New Password:</Text>
                    <TextInput onChangeText={(val)=> setNewPassword(val)} secureTextEntry={true} style={ChangePasswordStyle.input}></TextInput>
                </View>
                <View style={ChangePasswordStyle.each_container}>
                    <Text style={ChangePasswordStyle.subtitle}>New Password Again:</Text>
                    <TextInput onChangeText={(val)=> setCheckPassword(val)} secureTextEntry={true} style={ChangePasswordStyle.input}></TextInput>
                    { error === "check-password" && <Text style={[ChangePasswordStyle.subtitle, {color: 'red', marginTop: 5}]}>Passwords are not matching!</Text>}
                </View>
                <TouchableOpacity onPress={()=> {
                    if(checkPassword === newPassword)
                        handleChangePassword(oldPassword, newPassword);
                    else(setError("check-password"))
                }}>
                        <View style={ChangePasswordStyle.btn}>
                            <Text style={ChangePasswordStyle.btn_txt}>CHANGE</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}