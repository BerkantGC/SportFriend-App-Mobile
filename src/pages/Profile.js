import React, {useState, useEffect} from "react";
import { Alert, View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LogoutButton from "../components/LogoutButton/LogoutButton";

const baseUrl = "http://192.168.1.79:8080/"
export default function(props) {  
    const [profileData, setProfileData] = useState(null);
    const [isLoading, loadingUpdate] = useState(true);

    async function fetchProfileData(){
        loadingUpdate(true)
        const token = await AsyncStorage.getItem("@token")
        const username = JSON.parse(await AsyncStorage.getItem("@username"))
        await axios.get(baseUrl + "users/" + username, {headers: {"Authorization": `Bearer ${JSON.parse(token)}`}})
            .then(res => setProfileData(res.data))
            .catch(err=>Alert.alert(err))
        loadingUpdate(false);
    }

    useEffect(()=> {
        fetchProfileData();
    }, [])

    return(
        <SafeAreaView>
            {
                isLoading ? null 
                :
                <View style={{backgroundColor: '#212630', height: Dimensions.get("window").height}}>
                    <View style={ProfileStyle.upperside}>
                        <View style={ProfileStyle.user_display}>
                            <Image style={{width: 120, height: 120}}  source={require("../images/profile-icon.png")}/>
                            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>{profileData.username}</Text>
                            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>0,00</Text>
                            <LogoutButton navigation={props.navigation}/>
                        </View>
                    </View>
                    <View style={ProfileStyle.bottomside}>
                        <TouchableOpacity>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 70, height: 70}} tintColor='white' source={require("../images/favorites.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Favorites</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 60, height: 60}} tintColor='white' source={require("../images/add-game.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Add Game</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 60, height: 60}} tintColor='white' source={require("../images/comments.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Comments</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={{uri: "https://img.gamesatis.com/showcase/735/lol-hesap-64628.jpg"}} style={{width: Dimensions.get("window").width/1, height: 70, borderRadius: 5}}/>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

const ProfileStyle = StyleSheet.create({
    upperside: {
        backgroundColor: '#212630',
        height: Dimensions.get("window").height/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_display: {
        width: '80%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottomside: {
        backgroundColor: '#212630',
        height: Dimensions.get("window").height/4,
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    button_container: {
        backgroundColor: '#171a21',
        width: 120,
        height: 110,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 15,
    }
})