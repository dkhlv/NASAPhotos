import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ImageBackground, TouchableHighlight, Dimensions } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base'
import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

class PhotoList extends React.Component {

	constructor(props) {
		super(props)
	}
	
	static propTypes = {
    onItemPress: PropTypes.func.isRequired,
		data: PropTypes.array.isRequired
  }

	render() {	
		return (
      <Container style={{backgroundColor: "#000"}}>
        <Content>
        <FlatList
          style={styles.list}
          data={this.props.data}
          renderItem={({item}) => 
            <List>
              <ListItem avatar onPress={() => this.props.onItemPress(item.key)}>
                <Left>
                  <Thumbnail square source={{uri: item.url}} />
                </Left>
                <Body>
                  <Text style={{color: "#fff", fontSize: 20}}>{item.date}</Text>
                  <Text note style={{color: "#fff", fontSize: 15}} >{item.title}</Text>
                </Body>
              </ListItem>
            </List>
          }
          numColumns={1}
        />
        </Content>
      </Container>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent:'center',
		width: SCREEN_WIDTH,
    height: 100,
	},
	list: {
		flex: 1,
	}
})

export default PhotoList
