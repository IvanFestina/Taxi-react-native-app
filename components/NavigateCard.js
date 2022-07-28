import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch, useSelector} from "react-redux";
import {
    selectNavCardInputValue,
    setDestination, setIsDestinationReady,
    setNavCardInputValue
} from "../slices/navReducer";
import {useNavigation} from "@react-navigation/native";
import {RideOptionsCard} from "./RideOptionsCard";
import {NavFavorites} from "./NavFavorites";
import {Icon} from "react-native-elements";

export const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const navCardInput = useSelector(selectNavCardInputValue)

    const ref = useRef()
    const [value, setValue] = useState(navCardInput)
    useEffect(() => {
        setValue(navCardInput)
        ref.current?.setAddressText(navCardInput)
    }, [navCardInput])

    // const handleTextInput = (e) => {
    //     setText(e.currentTarget.value)
    // }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good day!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        ref={ref}
                        textInputProps={{
                            value: value,
                            onChangeText: (e) => dispatch(setNavCardInputValue(e))
                        }}
                        placeholder='Where to?'
                        debounce={400}
                        minLength={2}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        styles={toInputBoxStyles}
                        fetchDetails
                        returnKeyType={'search'}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                        onPress={(data, details = null) => {
                            console.log('You pressed GooglePlacesAutocomplete in Navigate Card, destination dispatched')
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description
                                }),
                            )
                            navigation.navigate(RideOptionsCard)
                        }}
                        renderRightButton={() => {
                            return (
                                <TouchableOpacity onPress={() => ref.current?.clear()}>
                                    <Icon
                                        style={tw`mt-2 ml-2`}
                                        name='close-circle-outline'
                                        type='ionicon'
                                        color='gray'
                                        size={30}
                                    />
                                </TouchableOpacity>)
                        }}
                    />
                </View>
                <NavFavorites action={setNavCardInputValue}/>
            </View>
            <View
                style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name={'car'} type='font-awesome' color='white' size={16}/>
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`flex flex-row w-24 px-4 py-3 rounded-full`}>
                    <Icon name={'fast-food-outline'} type='ionicon' color='black'
                          size={16}/>
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})