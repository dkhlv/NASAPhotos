import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'

class SinglePhoto extends React.Component {

	constructor(props) {
		super(props)  
	}
	
	render() {
		return (
				<View>
						<ImageBackground 
							style={styles.image}
							source={{uri: this.props.photo.url}}>
						</ImageBackground>
            <Text style={styles.title}>{this.props.photo.title}</Text>
					  <Text style={styles.explanation}>{this.props.photo.explanation}</Text>
				</View>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		margin: 10,
		fontSize: 25, 
		fontWeight: 'bold',
		color: '#fff'
	},
	explanation: {
		marginLeft: 5,
		color: '#fff',
    fontSize: 16,
    lineHeight: 19
	},
	image: {
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent:'center',
	}
})

export default SinglePhoto