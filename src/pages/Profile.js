import React, {useState, useEffect} from "react";
import { Alert, View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, TextInput} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import BackButton from "../components/BackButton/BackButton";

const baseUrl = "https://gamessatis-backend.herokuapp.com/"

//To Convert password to dots(.)
const toPassword = (password) => {
    let newPassword = [];
    for(let i = 0; i<password.length; i++){
       newPassword[i] = "."
    }
    return newPassword.join(" ");
}

export default function(props) {  
    const [profileData, setProfileData] = useState(null);
    const [modalVisible, modalVisibleUpdate] = useState(false);

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

    // To use change visibility in child component
    function closeModalFromParent() {
    modalVisibleUpdate({ modalVisible: false });
  };

    return(
        <SafeAreaView>
            {
                isLoading ? null 
                :
                <View style={{backgroundColor: '#212630', height: Dimensions.get("window").height}}>
                    <BackButton navigation={props.navigation}/>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=> modalVisibleUpdate(!modalVisible)}>
                        <ChangePassword navigation={props.navigation} modalVisibleUpdate={closeModalFromParent}/>
                    </Modal>
                    <View style={ProfileStyle.upperside}>
                        <View style={ProfileStyle.user_display}>
                            <Image style={{width: 120, height: 120}}  source={require("../images/profile-icon.png")}/>
                            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>{profileData.username}</Text>
                            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>0,00</Text>
                            <LogoutButton navigation={props.navigation}/>
                        </View>
                    </View>
                    <View style={ProfileStyle.detail_info}>
                        <View style={ProfileStyle.detail_contaier}>
                            <Text style={ProfileStyle.detail_txt}>Email: </Text>
                            <Text style={ProfileStyle.detail_txt}>{profileData.email}</Text>
                            <TouchableOpacity style={{backgroundColor: '#212630', marginRight: 5}}> 
                                <View style={{backgroundColor: '#171a21', ßalignItems: 'center', justifyContent: 'center'}}>                               
                                    <Image style={{width: 25, height: 25}} tintColor='white' source={require("../images/edit-icon.png")}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileStyle.detail_contaier}>
                            <Text style={ProfileStyle.detail_txt}>Password: </Text>    
                            <Text style={ProfileStyle.detail_txt}>{toPassword(profileData.password).slice(0,15)}</Text>
                            <TouchableOpacity onPress={()=>modalVisibleUpdate(!modalVisible)} style={{backgroundColor: '#212630', marginRight: 5}}> 
                                <View style={{backgroundColor: '#171a21',alignItems: 'center', justifyContent: 'center'}}>                               
                                    <Image style={{width: 25, height: 25}} tintColor='white' source={require("../images/edit-icon.png")}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileStyle.detail_contaier}>
                            <Text style={ProfileStyle.detail_txt}>Roles: </Text>
                            {profileData.roles.map(item => {
                                return(<Text style={ProfileStyle.detail_txt} key={item.role_id}>{item.roleName}</Text>)
                                })}
                        </View>
                    </View>
                    <View style={ProfileStyle.bottomside}>
                        <TouchableOpacity onPress={()=>props.navigation.navigate("Favorites", profileData)}>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 60, height: 60}} tintColor='white' source={require("../images/favorites.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Favorites</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>props.navigation.navigate("AddGame")}>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 55, height: 55}} tintColor='white' source={require("../images/add-game.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Add Game</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={ProfileStyle.button_container}>
                            <Image style={{width: 55, height: 55}} tintColor='white' source={require("../images/comments.png")}/>
                            <Text style={{color: 'white', fontSize: 15}}>Comments</Text>
                            </View>
                        </TouchableOpacity>
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
        alignItems: 'center',
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
    },
    detail_info: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    detail_contaier: {
        backgroundColor: '#171a21',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        width: '95%',
        height: 50,
        alignItems: 'center',
        flexDirection : 'row',
        justifyContent: 'space-between'
    },
    detail_txt:{
        color: 'white',
        fontSize: 15,
    }
})