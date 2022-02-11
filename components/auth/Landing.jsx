import React, { Component } from 'react'
import { View, Text, SafeAreaView, StatusBar, Pressable , Appearance } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import cfg from '../../config.js'
const app = cfg.app

export default class Landing extends Component {
  constructor(props){
	super(props);

  }

  render() {
	return (
	  <SafeAreaView style={tw`flex items-center justify-between w-full h-full m-0 px-4 ${app.dark ? 'bg-gray-800': 'bg-gray-100'}`}>
		<StatusBar backgroundColor={app.dark ? '#000': '#fff'} barStyle={app.dark ? 'light-content': 'dark-content'} hidden={false} />
		<View style={tw`p-12 flex items-center justify-center my-12`}>
		  <Text style={tw`text-3xl font-bold pt-12 ${app.dark ? 'text-gray-100' : ' text-gray-800'}`}>{app.name}</Text>
		  <Text style={tw`text-lg ${app.dark ? 'text-gray-200' : 'text-gray-600'}`}>{app.org}</Text>
		</View>
		<View style={tw`p-6 flex items-center justify-center my-12`}>
		  <Pressable style={tw`px-7 py-3 rounded-3xl w-full flex items-center ${app.dark ? 'bg-gray-100': 'bg-blue-500'}`} onPress={() => this.props.navigation.navigate('Login')}>
			<Text style={tw`text-xl ${app.dark ? 'text-gray-700': 'text-blue-100'}`}>Login</Text>
		  </Pressable>
		  <View style={tw`flex flex-row mt-12`}>
			<Text style={tw`mr-1 ${app.dark ? 'text-gray-400': 'text-gray-600'}`}>Do not have an account?</Text>
			<Pressable onPress={() => this.props.navigation.navigate('Register')}>
			  <Text style={tw`${app.dark ? 'font-bold text-white': 'underline text-blue-400'}`}>Register</Text>
			</Pressable>
		  </View>
		</View>
	  </SafeAreaView >
	)
  }
}
