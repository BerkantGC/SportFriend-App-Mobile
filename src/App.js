import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import GameDetails from "./pages/GameDetails";
import AddGame from "./pages/AddGame";
import Browser from "./components/Browser/Browser";

const Stack = createNativeStackNavigator();

const App = ()=> {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}} name="Main" component={Main}/>
                <Stack.Screen options={{headerShown:false}} name="Login" component={Login}/>
                <Stack.Screen options={{headerShown:false}} name="Profile" component={Profile}/>
                <Stack.Screen options={{headerShown:false}} name="Favorites" component={Favorites}/>
                <Stack.Screen options={{headerShown:false}} name="Details" component={GameDetails}/>
                <Stack.Screen options={{headerShown:false}} name="AddGame" component={AddGame}/>
                <Stack.Screen name="Browser" component={Browser}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App;
