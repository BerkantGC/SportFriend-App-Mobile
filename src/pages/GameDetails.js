import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableHighlight, TouchableOpacity, Linking } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const baseUrl = "https://gamessatis-backend.herokuapp.com/";

import { useFocusEffect } from '@react-navigation/native';
import BackButton from "../components/BackButton/BackButton";

export default function(props){
    const gameDetailId = props.route.params;

    const [gameData, setGameData] = useState(null)

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
                    <TouchableOpacity onPress={()=>Linking.openURL(gameData.youtubeTrailer)}>
                        <Icon name="logo-youtube" style={{marginHorizontal: 15}} size={50} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
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