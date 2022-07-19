import React, {createContext, useContext} from 'react';
import * as Google from 'expo-google-app-auth';

const AuthContext = createContext({
        //initial state of the context
    }
)

export const AuthProvider = ({children}) => {

const signInWithGoogle = async() => {
    await Google.logInAsync(config)
    //config allows us to connect to google logging
}

    return (
        <AuthContext.Provider value={
            {user: null}
        }>
            {children}
        </AuthContext.Provider>
    );
};

//we are using this hook instead of a consumer in a process
export default function useAuth() {
    return useContext(AuthContext)

}