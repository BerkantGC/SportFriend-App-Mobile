import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView} from "react-native";
import BackButton from "../components/BackButton/BackButton"
import Icon from "react-native-vector-icons/FontAwesome5";

const baseUrl = "https://gamessatis-backend.herokuapp.com/"

const FavoriteGames = (props) => {
    const imageUrl = baseUrl + "images/" + props.game.imageUrl;
    return(
        <TouchableOpacity onPress={()=> props.navigation.navigate("Details", props.game.id)} style={FavoriteStyle.each_container}>
            <View style={FavoriteStyle.image_container}>
            <Image source={{uri: imageUrl}} style={{resizeMode: 'cover', width: '100%', height: '100%'}}/>
            </View>
            <View style={FavoriteStyle.title_container}>
                <Text style={{color:'white', textAlign: 'left', }}>{props.game.gameName}</Text>
            </View>
            <Icon name="star" solid size={30} color='white'/>
        </TouchableOpacity>
    )
} 
export default function(props){
    const favorites = [];

    props.route.params.favorites.favoriteGames.map(games => favorites.push(games));

    return(
        <SafeAreaView style={FavoriteStyle.container}>
            <BackButton navigation={props.navigation}/>
            <ScrollView>
                {favorites.map(game =>{return(<FavoriteGames key={game.id} game={game} navigation={props.navigation}/>)})}
            </ScrollView>
        </SafeAreaView>
    )
}

const FavoriteStyle = StyleSheet.create({
    container: {
        backgroundColor: '#212630',
        justifyContent: 'center'
    },
    each_container: {
        marginHorizontal: 5,
        width: 'auto',
        height: Dimensions.get("window").height/5,
        backgroundColor: '#171a21',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius:10,
    },
    image_container:{
        width: '35%',
        height: '98%',
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    title_container: {
        width: '40%',
        height: '98%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})