import {Image, SafeAreaView, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {NavOptions} from "../components/NavOptions";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch, useSelector} from "react-redux";
import {selectPredefinedPlaces, setDestination, setOrigin} from "../slices/navReducer";
import {NavFavorites} from "../components/NavFavorites";

export const HomeScreen = () => {
    const dispatch = useDispatch()
    const predefinedPlaces = useSelector(selectPredefinedPlaces)


    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                    source={{
                        uri: "https:/links.papareact.com/gzs"
                    }}/>

                <GooglePlacesAutocomplete
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
                    fetchDetails={true}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    styles={{container: {flex: 0}, textInput: {fontSize: 18}}}

                />

                <NavOptions/>
                <NavFavorites/>
            </View>
        </SafeAreaView>
    )
}
