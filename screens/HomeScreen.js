import React from 'react';
import {Button, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const HomeScreen = () => {

    const navigation = useNavigation()

    return (
        <View>
            <Text>I am the Home Screen</Text>
            <Button title='Go to Chat Screen' onPress={() => navigation.navigate('Chat')}/>
        </View>
    );
};

