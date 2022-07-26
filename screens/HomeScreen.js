import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {NavOptions} from "../components/NavOptions";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch, useSelector} from "react-redux";
import {selectPredefinedPlaces, setDestination, setOrigin} from "../slices/navReducer";
import {NavFavorites} from "../components/NavFavorites";
import TAXI from '../assets/TAXI.png'
import {Icon} from "react-native-elements";
import React, {useRef} from "react";
import {clear} from "react-native/Libraries/LogBox/Data/LogBoxData";

export const HomeScreen = () => {
    const dispatch = useDispatch()
    const predefinedPlaces = useSelector(selectPredefinedPlaces)
    const ref = useRef()

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
                    placeholder='Where From?'
                    minLength={2}
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
                    predefinedPlaces={[predefinedPlaces]}
                    predefinedPlacesAlwaysVisible={true}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
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
                    styles={{container: {flex: 0, marginTop: 30}, textInput: {fontSize: 18}}}

                />

                <NavOptions/>
                <NavFavorites ref={ref}/>
            </View>
        </SafeAreaView>
    )
}
