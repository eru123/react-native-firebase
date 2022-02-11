import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import cfg from './config.js'

initializeApp(cfg.firebaseConfig);

const Stack = createNativeStackNavigator();
const auth = getAuth()

export default function App() {
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			console.log(user, 'firebase auth state change')
		})
	})

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Landing">
				<Stack.Screen name="App" component={Landing} options={{ headerShown: false }} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}