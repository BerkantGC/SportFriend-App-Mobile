import React from "react";
import { View, Text} from "react-native";

const FavoriteGames = ({game}) => {
    return(
        <Text>{game.gameName}</Text>
    )
} 
export default function(props){
    const favorites = [];

    props.route.params.favorites.favoriteGames.map(games => favorites.push(games));

    console.log(favorites)
    return(
        <View>
            <View>{favorites.map(game =>{return(<FavoriteGames game={game}/>)})}</View>
        </View>
    )
}