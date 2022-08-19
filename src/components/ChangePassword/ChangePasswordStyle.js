import { Dimensions, StyleSheet } from "react-native";

const ChangePasswordStyle = StyleSheet.create({
    centerView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#212630',
    },
    container:{
        width: Dimensions.get("screen").width/1.2,
        height: Dimensions.get("screen").height/2,
    },
    each_container: {
        justifyContent: 'center',
        marginVertical: 20
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        height: 35,
    },
    btn: {
        marginTop: 20,
        width: "50%",
        backgroundColor: '#32a0db',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
    },
    btn_txt: {
        color: 'white',
    }
})

export default ChangePasswordStyle;