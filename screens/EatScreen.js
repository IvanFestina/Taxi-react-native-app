import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export const EatScreen = () => {

    const navigation = useNavigation()

    return (
        <View style={tw`flex-1 justify-center`}>
            <TouchableOpacity
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3
             rounded-full shadow-lg`}
                onPress={() => {
                    navigation.navigate('HomeScreen')
                }}>
                <Icon name='menu'/>
            </TouchableOpacity>
            <Text style={tw`text-center text-xl font-semibold`}>Sorry, this page is under
                maintenance</Text>
        </View>
    );
};

