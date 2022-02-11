import React, { Component } from 'react'
import { Text, View, Button, TextInput, SafeAreaView , Pressable } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {getAuth, createUserWithEmailAndPassword, signOut} from 'firebase/auth'

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			name: '',
			pass: '',
			error: ''
		}

		this.onRegister = this.onRegister.bind(this);
		
		// const auth = getAuth()
		// signOut(auth)
	}

	async onRegister() {
		this.setState({error: ''})
		const { email, name, pass } = this.state;
		const auth = getAuth()

		console.log('register')
		await createUserWithEmailAndPassword(auth, email, pass)
			.then((cred) => {
				const user = cred.user;
				console.log(cred,'cred')
				console.log(user,'user')
			})
			.catch((error) => {
				console.log(error.name)
				this.setState({error: error.message})
			});
	}

	render() {
		function Error(p){
			const {error,style} = p
			if(error) {
				const trimmed = String(error).trim().split(':')
				const proc = trimmed.length > 1 ? trimmed[1] : trimmed[0]
				return <Text style={{...tw`${style}`,maxWidth: 300}}>{proc}</Text>
			} else return null
		}


		return (
			<SafeAreaView style={tw`h-full w-full flex items-center justify-center bg-white`}>
				<View>
					<View style={tw`mb-20 flex items-center justify-center`}>
						<Text style={tw`font-bold text-gray-600 text-3xl`}>Register</Text>
					</View>
					<Error style={`text-red-500 text-center mb-4`} error={this.state.error} />
					<View style={tw`flex flex-col items-center justify-between`}>
						<TextInput style={{...tw`border rounded-3xl border-gray-400 py-3 px-4 mb-4`, width:'100%', maxWidth:250}} placeholder="Email" onChangeText={(email) => this.setState({ email })} />
						<TextInput style={{...tw`border rounded-3xl border-gray-400 py-3 px-4 mb-4`, width:'100%', maxWidth:250}} placeholder="Name" onChangeText={(name) => this.setState({ name })} />
						<TextInput style={{...tw`border rounded-3xl border-gray-400 py-3 px-4 mb-4`, width:'100%', maxWidth:250}} placeholder="Password" secureTextEntry={true} onChangeText={(pass) => this.setState({ pass })} />
						<Pressable style={{...tw`mt-12 px-7 py-3 rounded-3xl flex items-center bg-blue-500`, width:'100vw', maxWidth:250}} onPress={() => this.onRegister()}>
							<Text style={tw`text-base text-blue-100 uppercase`}>submit</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}
