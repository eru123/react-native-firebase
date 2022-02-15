import React, { Component, useEffect } from 'react'
import { Text, View, Button, TextInput, SafeAreaView, Pressable } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			pass: '',
			error: '',
			loading: false
		}

		this.onLogin = this.onLogin.bind(this);


	}

	async onLogin() {
		const { email, pass } = this.state;
		if (!(email && pass)) {
			this.setState({ error: "Invalid credentials" })
			return
		}

		this.setState({ loading: true })
		const auth = getAuth()

		await signInWithEmailAndPassword(auth, email, pass)
			.then((cred) => {
				this.setState({ error: '' })
			})
			.catch((error) => this.setState({ error: error.message }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		function Error(p) {
			const { error, style } = p
			if (error) {
				const trimmed = String(error).trim().split(':')
				const proc = trimmed.length > 1 ? trimmed[ 1 ] : trimmed[ 0 ]
				return <Text style={{ ...tw`${style}`, maxWidth: 300 }}>{proc}</Text>
			} else return null
		}

		return (
			<SafeAreaView style={tw`h-full w-full flex items-center justify-center bg-white`}>
				<View>
					{this.state.loading ? <Spinner
						visible={true}
						textContent={'Please wait...'}
						overlayColor='rgba(0, 0, 0, 0.6)'
						textStyle={tw`text-white`}
					/> : null}
					<Error style={`text-red-500 text-center mb-4`} error={this.state.error} />
					<View style={tw`flex flex-col items-center justify-between`}>
						<TextInput style={inputStyle} placeholder="Email" onChangeText={(email) => this.setState({ email })} />
						<TextInput style={inputStyle} placeholder="Password" secureTextEntry={true} onChangeText={(pass) => this.setState({ pass })} />
						<Pressable onPress={() => this.onLogin()}
							style={({ pressed }) => ({ ...tw`mt-12 px-7 py-3 rounded-3xl flex items-center ${pressed ? 'bg-blue-600' : 'bg-blue-500'}`, width: 300 })}>
							<Text style={tw`text-base text-blue-100 uppercase`}>submit</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}

const inputStyle = { ...tw`border rounded-3xl border-gray-300 py-3 px-4 mb-4`, width: 300 }