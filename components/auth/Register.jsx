import React, { Component } from 'react'
import { Text, View, TextInput, SafeAreaView, Pressable, Alert } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Spinner from 'react-native-loading-spinner-overlay';
import {userStore} from '../../store/user'
import {observer} from 'mobx-react'
import {authError} from '../../lib/firebase'
class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			name: '',
			pass: '',
			cpass: '',
			error: '',
			loading: false
		}

		this.onRegister = this.onRegister.bind(this);
	}

	async onRegister() {
		const { email, name, pass, cpass } = this.state;
		if (!(cpass === pass && pass)) {
			this.setState({ error: "Password doesn't match!" })
			return
		}

		this.setState({ loading: true })
		const auth = getAuth()
		userStore.setCreateMode(true)
		await createUserWithEmailAndPassword(auth, email, pass)
			.then(async (cred) => {
				return await cred.user.updateProfile({ displayName: name })
					.catch(err => {
						Alert.alert('Success with Error', authError(err.code))
						return
					})
			})
			.catch((error) => {
				this.setState({ error: authError(error.code) })
			})
			.finally(() => {
				this.setState({ loading: false })
				userStore.setCreateMode(false)
			})
	}

	render() {
		function Error(p) {
			const { error, style } = p
			if (error) {
				return <Text style={{ ...tw`${style}`, maxWidth: 300 }}>{error}</Text>
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
						<TextInput style={inputStyle} placeholder="Name" onChangeText={(name) => this.setState({ name })} />
						<TextInput style={inputStyle} placeholder="Password" secureTextEntry={true} onChangeText={(pass) => this.setState({ pass })} />
						<TextInput style={inputStyle} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(cpass) => this.setState({ cpass })} />
						<Pressable onPress={() => this.onRegister()}
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
export default observer(Register)