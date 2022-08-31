import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions} from "react-native";
import BackButton from "../components/BackButton/BackButton"
import Icon from "react-native-vector-icons/FontAwesome5";

const baseUrl = "https://gamessatis-backend.herokuapp.com/"

const FavoriteGames = ({game}) => {
    const imageUrl = baseUrl + "images/" + game.imageUrl;
    return(
        <View style={FavoriteStyle.each_container}>
            <View style={FavoriteStyle.image_container}>
            <Image source={{uri: imageUrl}} style={{resizeMode: 'cover', width: '100%', height: '100%'}}/>
            </View>
            <View style={FavoriteStyle.title_container}>
                <Text style={{color:'white', textAlign: 'left', }}>{game.gameName}</Text>
            </View>
            <Icon name="star" solid size={30} color='white'/>
        </View>
    )
} 
export default function(props){
    const favorites = [];

    props.route.params.favorites.favoriteGames.map(games => favorites.push(games));

    return(
        <View style={FavoriteStyle.container}>
            <BackButton navigation={props.navigation}/>
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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/5,
        backgroundColor: '#171a21',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    image_container:{
        width: '35%',
        height: '98%',
        backgroundColor: 'white'
    },
    title_container: {
        width: '40%',
        height: '98%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})