import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    navCardInput: '',
    homeScreenInput: '',
    isDestinationReady: false
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
        setNavCardInputValue: (state, action) => {
            state.navCardInput = action.payload
        },
        setHomeScreenInputValue: (state, action) => {
            state.homeScreenInput = action.payload
        },
        setIsDestinationReady: (state, action) => {
            state.isDestinationReady = action.payload
        },

    }
})

export const {setOrigin, setDestination, setTravelTimeInformation, setIsDestinationReady, setNavCardInputValue, setHomeScreenInputValue} = navSlice.actions

// Selectors
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectPredefinedPlaces = (state) => state.nav.predefinedPlaces
export const selectNavCardInputValue = (state) => state.nav.navCardInput
export const selectHomeScreenInput = (state) => state.nav.homeScreenInput
export const selectIsDestinationReady = (state) => state.nav.isDestinationReady


export default navSlice.reducer