import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import axios from "axios";

const baseUrl = "http://192.168.1.80:8080/";

import { useFocusEffect } from '@react-navigation/native';

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
        <View>
           {gameData !== null && 
           <View>
                <View>
                    <Image style={styles.image} source={{uri: imageUrl}}/>
                </View>
                <Text>{gameData.description}</Text>
                <Text>{gameData.year}</Text>
                <Text>{gameData.views}</Text>
           </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height/3,
    }
})