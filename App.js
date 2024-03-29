import {NavigationContainer} from "@react-navigation/native";
import {store} from "./store";
import {Provider} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./screens/HomeScreen";
import {MapScreen} from "./screens/MapScreen";
import {KeyboardAvoidingView, Platform} from "react-native";
import {EatScreen} from "./screens/EatScreen";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView style={{flex: 1}}
                                          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
                        <Stack.Navigator>
                            <Stack.Screen name='HomeScreen' component={HomeScreen}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name='MapScreen' component={MapScreen}
                                          options={{headerShown: false}}/>
                            <Stack.Screen name='EatScreen' component={EatScreen}
                                          options={{headerShown: false}}/>
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
};
