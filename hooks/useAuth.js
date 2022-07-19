import React, {createContext, useContext} from 'react';
import {View} from "react-native";

const AuthContext = createContext({
    //initial state of the context
}

)

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={
            {user: 'Ivan'}
        }>
            {children}
        </AuthContext.Provider>
    );
};

//we are using this hook instead of a consumer in a process
export default function useAuth() {
    return useContext(AuthContext)

}