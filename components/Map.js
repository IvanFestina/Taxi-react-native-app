import React, {useEffect, useRef} from 'react';
import MapView, {Marker} from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDestination,
    selectOrigin,
    setTravelTimeInformation
} from "../slices/navReducer";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_APIKEY} from '@env';


export const Map = () => {

    const fitToMarkers = () => {
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            },
        })
    }
    const origin = useSelector(selectOrigin)
    const destination = useSelector((selectDestination))
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!origin || !destination) return;
        //zoom and fit to markers
        fitToMarkers()
    }, [origin, destination, mapRef])

    useEffect(() => {
        if (!origin || !destination) return
        const getTravelTime = () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`)
                .then(res => {
                    console.log(JSON.stringify(`this is JSON.stringify ${res}`))
                    return JSON.stringify(res)
                })
                .then(data => {
                    console.log(`this is ${data}`)
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
                .catch(error => console.log(`this is error: ${error}`))
        };
        getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_APIKEY])
    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor='black'
                    strokeWidth={3}
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    title='Destination'
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    );
};

