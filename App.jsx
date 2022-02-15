import React, { useEffect, useState } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { observer } from 'mobx-react'
import tw from 'tailwind-react-native-classnames'

import { userStore } from './store/user'

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import cfg from './config.js'
const Stack = createNativeStackNavigator();

const App = observer(() => {
	const [loaded, setLoaded] = useState(false)

	initializeApp(cfg.firebaseConfig);
	const auth = getAuth()
	const email = 'test@mail.com'
	const pass = '!Password123'	

	const login = async () => {
		return await signInWithEmailAndPassword(auth, email, pass)
			.then((e) => console.log('in'))
			.catch((e) => console.log(e))
	}

	const register = async () => {
		return await createUserWithEmailAndPassword(auth, email, pass)
			.then((e) => console.log('in'))
			.catch((e) => console.log(e))
	}

	const logout = async () => {
		return await signOut(auth)
	}

	useEffect(() => {
		onAuthStateChanged(auth, u => {
			if(!loaded) setLoaded(true)
			userStore.setUserProvider(u)
			console.log('firebase auth state change')
		})
	},[]);

	useEffect(()=> {
		console.log(userStore.createMode, 'create mode')
	},[userStore.createMode])

	if(!loaded) return <View style={tw`flex items-center justify-center`}><Text>Loading...</Text></View>

	// if(!userStore.auth)return (
	// 	<View style={tw`flex-1 justify-center items-center`}>
	// 		<Text>{userStore.userProvider?.uid}</Text>
	// 		<Button title="Login" onPress={() => login()} />
	// 		<Button title="Register" onPress={() => register()} />
	// 	</View>
	// )

	if (!userStore.auth || userStore.createMode) return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Landing">
				<Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	)

	else return (
			<View style={tw`flex-1 justify-center items-center`}>
				<Text>{userStore.userProvider?.uid}</Text>
				{/* <Button title="Login" onPress={() => login()} /> */}
				{/* <Button title="Register" onPress={() => register()} /> */}
				<Button title="Logout" onPress={() => logout()} />
			</View>
		)
})
export default App