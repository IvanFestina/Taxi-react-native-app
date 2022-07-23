import React, {useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

const data = [
    {
        id: 'Taxi-X-123',
        title: 'Taxi standard',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Taxi-X-456',
        title: 'Taxi comfort',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'Taxi-X-789',
        title: 'Taxi premium',
        multiplier: 1.5,
        image: 'https://links.papareact.com/7pf',
    },
]


export const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null);


    const itemRender = ({item: {id, title, multiplier, image}}) => {
        return (
            <TouchableOpacity
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && 'bg-gray'}`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{uri: image}}
                />
                <View style={tw`-ml-6`}>
                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                    <Text>Travel time...</Text>
                </View>
                <Text style={tw`text-xl`}>10 USD</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                    <Icon
                        name='chevron-left'
                        type='fontawesome'/>
                </TouchableOpacity>
                <Text
                    style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
            </View>
            <FlatList data={data} renderItem={itemRender} keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
};

