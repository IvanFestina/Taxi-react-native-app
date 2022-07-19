import React from 'react';
import {Text, View} from "react-native";
import useAuth from "../hooks/useAuth";

export const LoginScreen = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <View>
            <Text>LoginScreen</Text>
        </View>
    );
};

