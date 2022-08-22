import React from "react"
import { Button, Text, TextInput, View } from "react-native"

import { launchImageLibrary } from "react-native-image-picker"

const handleSelectImage = async() => {
    const result  = await launchImageLibrary();
    console.log(result)
}
const AddGame = () => {
    return(
        <View>
            <View>
                <Text>Name:</Text>
                <TextInput/>
            </View>
            <View>
                <Text>Description:</Text>
                <TextInput/>
            </View>
            <View>
                <Text>Cost:</Text>
                <TextInput/>
            </View>
            <View>
                <Text>Year:</Text>
                <TextInput/>
            </View>
            <View>
                <Button title="image" onPress={handleSelectImage}></Button>
            </View>
        </View>
    )
}

export default AddGame;