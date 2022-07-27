import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    predefinedPlaces: null,
    navCardInput: '',
    homeScreenInput: ''
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
        setPredefinedPlaces: (state, action) => {
            state.predefinedPlaces = action.payload
        },
        setNavCardInputValue: (state, action) => {
            state.navCardInput = action.payload
        },
        setHomeScreenInputValue: (state, action) => {
            state.homeScreenInput = action.payload
        },
    }
})

export const {setOrigin, setDestination, setTravelTimeInformation, setPredefinedPlaces, setNavCardInputValue, setHomeScreenInputValue} = navSlice.actions

// Selectors
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectPredefinedPlaces = (state) => state.nav.predefinedPlaces
export const selectNavCardInputValue = (state) => state.nav.navCardInput
export const selectHomeScreenInput = (state) => state.nav.homeScreenInput


export default navSlice.reducer