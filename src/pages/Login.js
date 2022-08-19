import React, {useState} from "react";
import { SafeAreaView, TextInput, View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

const baseUrl = "http://192.168.1.80:8080/";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveToken(data){
    await AsyncStorage.setItem("@token", JSON.stringify(data.token))
    await AsyncStorage.setItem("@username", JSON.stringify(data.username))
    const token = await AsyncStorage.getItem("@token");
    console.log(token);
}

export default function(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(username, password)=> {
        const user = {
            "username": username,
            "password": password
        }
        await axios.post(baseUrl + "login", user)
            .then(res => {
                saveToken(res.data)
                props.navigation.goBack();
            })
            .catch(err => {
                console.log(err)
                AsyncStorage.removeItem("@token")
                AsyncStorage.removeItem("@username")
            });
    }
    
    return(
        <SafeAreaView style={LoginStyle.container}> 
            <View style={LoginStyle.login_area}>
                <Text style={LoginStyle.login_title}>LOGIN PAGE</Text> 
                <View style={LoginStyle.input_area}>
                    <TextInput style={LoginStyle.input} onChangeText={val => setUsername(val)} placeholderTextColor="#212630" placeholder="Username..."/>
                    <TextInput style={LoginStyle.input} onChangeText={val => setPassword(val)} placeholderTextColor="#212630" secureTextEntry={true} placeholder="Password..."/>
                    <TouchableOpacity onPress={()=> handleLogin(username, password)}>
                        <View style={LoginStyle.login_btn}>
                            <Text style={LoginStyle.login_txt}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const LoginStyle = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#171a21',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login_area: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_title:{
        color: 'white',
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 15       
    },
    login_btn: {
        marginTop: 10,
        width: "90%",
        backgroundColor: '#32a0db',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 5,
        borderWidth: 5,
        borderRadius: 20,
    },
    login_txt: {
        color: 'white'
    },
    input_area: {
        width: '80%'
    },
    input: {
        width: '100%',
        color: '#212630',
        textAlign: 'center',
        borderWidth: 5,
        borderColor: 'black',
        height: 40,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 15,
    }
})