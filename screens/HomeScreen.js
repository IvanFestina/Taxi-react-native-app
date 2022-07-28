import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {NavOptions} from "../components/NavOptions";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch, useSelector} from "react-redux";
import {
    selectHomeScreenInput,
    setDestination,
    setHomeScreenInputValue,
    setOrigin
} from "../slices/navReducer";
import {NavFavorites} from "../components/NavFavorites";
import TAXI from '../assets/TAXI.png'
import {Icon} from "react-native-elements";
import React, {useEffect, useRef, useState} from "react";

export const HomeScreen = () => {
    const dispatch = useDispatch()
    const homeScreenInput = useSelector(selectHomeScreenInput)

    const ref = useRef()
    const [value, setValue] = useState(homeScreenInput)
    useEffect(() => {
        setValue(homeScreenInput)
        ref.current?.setAddressText(homeScreenInput)
    }, [homeScreenInput])

    return (
        <SafeAreaView style={tw`bg-white h-full mt-6`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        display: 'flex',
                        alignSelf: 'center',
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={TAXI}/>
                <GooglePlacesAutocomplete
                    ref={ref}
                    textInputProps={{
                        value,
                        onChangeText: (e) => dispatch(setHomeScreenInputValue(e))
                    }}
                    placeholder='Where From?'
                    debounce={400}
                    minLength={2}
                    fetchDetails
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    onPress={(data, details = null) => {
                        // console.log(details.geometry.location)
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}

                    renderRightButton={() => {
                        return (
                            <TouchableOpacity onPress={() => ref.current?.clear()}>
                                <Icon
                                    style={tw`mt-2`}
                                    name='close-circle-outline'
                                    type='ionicon'
                                    color='gray'
                                    size={30}
                                />
                            </TouchableOpacity>)
                    }}
                    styles={{
                        container: {flex: 0, marginTop: 30},
                        textInput: {fontSize: 18}
                    }}
                />

                <NavOptions/>
                <NavFavorites action={setHomeScreenInputValue}/>
            </View>
        </SafeAreaView>
    )
}
