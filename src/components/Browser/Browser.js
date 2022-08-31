import React from "react";
import { SafeAreaView,View} from "react-native";
import {WebView} from "react-native-webview";
import BackButton from "../BackButton/BackButton";

export default function(props){
    const url = props.route.params.url
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#212630'}}>
            <WebView source={{uri: url}} style={{flex: 1,}}>

            </WebView>
        </SafeAreaView>
    )
}