import {StackNavigator} from "./StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider} from "./hooks/useAuth";

export default function App() {


    return (
        <NavigationContainer>
            {/*HOC*/}
            <AuthProvider>
                <StackNavigator/>
            </AuthProvider>
        </NavigationContainer>
    )
};
