import React, { useEffect, useState } from 'react';
import TabBar from "../components/TabBar/TabBar";

import {
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

const baseUrl = "http://192.168.1.80:8080/"

import axios from 'axios';

const Main = (props) => {
  const [data, setData] = useState(null);

  useEffect(()=> {
    const fetchData = async() => {
      const url = baseUrl + "sellers"
      await axios.get(url).then(res=>setData(res.data))
      .catch(err=>console.log(err))
    }
    fetchData();
  }, [])
  let gamesData = [];
  if(data != null){
  data.map(item => {
    item.games.map(games => {
      gamesData.push(games)
    })
  })
}
  const renderItem = (({item}) => {
    const imageUrl = baseUrl + "images/" + item.imageUrl;
    return( 
    <TouchableOpacity onPress={null} style={styles.each_game_container}>
      <Image style={styles.images} source={{uri: imageUrl}}/>
      <Text style={styles.game_titles}>{item.gameName}</Text>
    </TouchableOpacity>
    );
  })

  return (
    <SafeAreaView style={styles.container}>
      <TabBar navigation={props.navigation}/>
      <View>
        <FlatList 
        key={'#'}
        style={styles.all_games_container}
        data={gamesData}
        renderItem={renderItem}
        keyExtractor={item => "#" + item.id}
        numColumns={2}
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: '#171a21',
      width: "100%",
      height: Dimensions.get("window").height,
    },
    all_games_container: {
      marginHorizontal: 1,
    },
    each_game_container:{
      width: "45%",
      margin: 10,
      height: Dimensions.get("window").height/2.5,
      justifyContent: "space-between",
      backgroundColor: "#212630",
      borderRadius: 10,
      paddingBottom: 5,
      alignItems: "center",
},
    images: {
      width: "100%",
      height: "85%",
      borderRadius: 10,
      resizeMode: "cover"
    },
    game_titles: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      textAlign: 'center'
    },
  }
)

export default Main;