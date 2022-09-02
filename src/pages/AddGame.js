import { useLinkProps } from "@react-navigation/native";
import React from "react"
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { launchImageLibrary } from "react-native-image-picker"
import BackButton from "../components/BackButton/BackButton";

import Font from "react-native-vector-icons/FontAwesome5";
const handleSelectImage = async() => {
    const result  = await launchImageLibrary();
    console.log(result)
}

const AddGame = (props) => {
    return(
        <SafeAreaView style={styles.container}>
            <BackButton navigation={props.navigation}/>
            <View style={styles.main_container}>
                <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center',fontSize: 30, flexDirection: 'row', color: 'white', marginBottom: 30}}>
                    <Font color="white" name="gamepad" size={35}/>
                    <Text style={{color:"white", fontSize: 30, fontWeight:'bold', marginLeft: 10}}>ADD GAME</Text>
                </View>
            <View style={styles.input}>
                <Text style={styles.text}>NAME</Text>
                <TextInput style={{width: '70%', padding: 5, backgroundColor: 'white', borderRadius: 5}}/>
            </View>
            <View style={styles.description}>
                <Text style={styles.text}>DESCRIPTION</Text>
                <TextInput multiline={true} style={{width: '70%', height: '70%', padding: 5, backgroundColor: 'white', borderRadius: 5}}/>
            </View>
            <View style={styles.input}>
                <Text style={styles.text}>COST</Text>
                <TextInput style={{width: '70%', padding: 5, backgroundColor: 'white', borderRadius: 5}}/>
            </View>
            <View style={styles.input}>
                <Text style={styles.text}>YEAR</Text>
                <TextInput style={{width: '70%', padding: 5, backgroundColor: 'white', borderRadius: 5}}/>
            </View>
            <TouchableOpacity  onPress={handleSelectImage} style={styles.uploadImage}>
                <Font name="camera" size={25} color='#32a0db' ></Font>
                <Button title="Upload Image" color="#32a0db" onPress={handleSelectImage}></Button>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171a21",

    },
    main_container: {
        flex: 1,
        backgroundColor: "#171a21",
        justifyContent: 'center',
    },
    input: {
        backgroundColor: "#212630",
        marginHorizontal: 10,
        marginVertical: 10,
        height: "10%",
        borderRadius: 5,
        padding: 5,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    description: {
        backgroundColor: "#212630",
        marginHorizontal: 10,
        marginVertical: 10,
        height: "35%",
        borderRadius: 5,
        padding: 5,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'space-evenly',

    },
    uploadImage: {
        backgroundColor: "#212630",
        marginHorizontal: "25%",
        marginVertical: 5,
        height: "10%",
        borderRadius: 5,
        padding: 10,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'space-evenly'
        
    },
    text: {
        color: 'white',
        fontWeight: '600',
    }
})

export default AddGame;