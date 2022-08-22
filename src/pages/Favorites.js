import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

const baseUrl = "http://192.168.1.80:8080/"

const FavoriteGames = ({game}) => {
    const imageUrl = baseUrl + "images/" + game.imageUrl;
    return(
        <View style={FavoriteStyle.each_container}>
            <Image source={{uri: imageUrl}} style={{resizeMode: 'cover', width: Dimensions.get("window").height/4, height: Dimensions.get("window").height/6}} />
            <Text style={{color:'white', textAlign: 'left'}}>{game.gameName}</Text>
            <Icon name="star" solid size={30} color='white'/>
        </View>
    )
} 
export default function(props){
    const favorites = [];

    props.route.params.favorites.favoriteGames.map(games => favorites.push(games));

    return(
        <View style={FavoriteStyle.container}>
            <ScrollView>
                {favorites.map(game =>{return(<FavoriteGames key={game.id} game={game}/>)})}
            </ScrollView>
        </View>
    )
}

const FavoriteStyle = StyleSheet.create({
    container: {
        backgroundColor: '#212630'
    },
    each_container: {
        backgroundColor: '#171a21',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
})