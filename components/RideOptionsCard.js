import React, {useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {
    selectDestination,
    selectOrigin,
    selectTravelTimeInformation
} from "../slices/navReducer";
import 'intl';
import 'intl/locale-data/jsonp/en'

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

const SURGE_CHARGE_RATE = 1.5


export const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)


    console.log(`this is RideOptionCards travelTimeInformation`, travelTimeInformation)

    const itemRender = ({item: {id, title, multiplier, image}, item}) => {
        return (
            <TouchableOpacity
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-10 ${
                    id === selected?.id && 'bg-gray-200'}`}>
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
                    <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                </View>
                {origin && destination &&
                <Text style={tw`text-xl`}>
                    {new Intl.NumberFormat('en-gb', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(
                        (travelTimeInformation?.duration.value *
                            SURGE_CHARGE_RATE *
                            multiplier) / 100
                    )}

                </Text>}

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
                    style={tw`text-center py-5 text-xl`}>Select a Ride
                    - {travelTimeInformation?.distance.text}</Text>
            </View>

            <FlatList data={data} renderItem={itemRender} keyExtractor={item => item.id}/>

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected}
                                  style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text
                        style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

