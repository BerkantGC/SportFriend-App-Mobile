import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import BackButtonStyle from "./BackButtonStyle";

export default function(props){
    return(
        <TouchableOpacity onPress={()=> props.navigation.goBack()} style={BackButtonStyle.container}>
            <View>
                <Text style={{fontSize: 18}}>Back</Text>
            </View>
        </TouchableOpacity>
    )
}