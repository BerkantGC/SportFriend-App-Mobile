import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableHighlight, TouchableOpacity, Linking, Alert } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const baseUrl = "https://gamessatis-backend.herokuapp.com/";

import { useFocusEffect } from '@react-navigation/native';
import BackButton from "../components/BackButton/BackButton";

export default function(props){
    const gameDetailId = props.route.params;

    const [gameData, setGameData] = useState(null)
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

    const fetchData = async() => {
        await axios.get(baseUrl + "game-details/" + gameDetailId).then(
            res => {
                console.log(res.data)
                setGameData(res.data)
            }
        )    
    }    
    useFocusEffect(
        React.useCallback(() => {
          fetchData();
        }, [])
      );

      function openYoutubeLink(){
        props.navigation.navigate("Browser",
        {
            url: gameData.youtubeTrailer
        })
      }
      const handleAddFavorites = async(gameName) => {
        if(username === null || token ===null){
            Alert.alert("User not logged in!");
        }
        else{
            const userAndGame = {
                "username" : username,
                "favorites": {
                    "favoriteGames":[{
                        "gameName": gameName
                    }]
                }
            }

            await axios.put(baseUrl + "add_favorite/", userAndGame, {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res =>{ 
                alert("Added to your favorites");
                setIsFavorite(true);
            })
            .catch(err => alert(err));
        }
      }
      let imageUrl;
      if(gameData !== null){
            imageUrl = baseUrl + "images/" + gameData.imageUrl;
        }
    return(
        <ScrollView style={styles.container}>
           {gameData !== null && 
           <View>
            <BackButton navigation={props.navigation}></BackButton>
                <View>
                    <Image style={styles.image} source={{uri: imageUrl}}/>
                </View>
                <View style={styles.title_container}>
                    <Text adjustsFontSizeToFit={true} style={styles.title}>{gameData.gameName}</Text>
                </View>
                <View style={styles.action_btn}>
                    <TouchableOpacity onPress={openYoutubeLink}>
                        <Icon name="logo-youtube" style={{marginHorizontal: 15}} size={50} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleAddFavorites(gameData.gameName)}>
                        <Icon name="star-outline" style={{marginHorizontal: 15}} size={50} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="cart-outline" style={{marginHorizontal: 15}} size={50} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.desc_container}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 15}}>Description: </Text>
                    <Text style={{color: 'white',}} adjustsFontSizeToFit={true}>{gameData.description}</Text>
                </View>
                <View style={styles.details_container}>

                    <Text style={{color: 'white'}}>Product Id: {gameData.id}</Text>
                    <Text style={{color: 'white'}}>Views: {gameData.views}</Text>
                    <Text style={{color: 'white'}}>Year: {gameData.year}</Text>
                </View>
           </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212630',
        flex: 1,
    },
    image: {
        width: "100%",
        height: Dimensions.get("screen").height/3,
    },
    title_container: {
        alignItems: 'center',  
    },
    title: {
        marginTop: 20,
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    action_btn: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    desc_container: {
        backgroundColor: '#171a21',
        padding: 10,
        marginTop: 15,
        marginHorizontal: 10,
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    details_container: {
        backgroundColor: '#171a21',
        marginHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    }
})