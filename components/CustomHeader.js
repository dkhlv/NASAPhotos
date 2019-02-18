import React, { Component } from 'react'
import { Header, Title, Button, Icon, Left, Right, Body, Text } from "native-base"
import { View } from 'react-native'
import PropTypes from 'prop-types'

class CustomHeader extends React.Component {
  constructor(props){
    super(props)
  }
  
  static propTypes = {
    left: PropTypes.func.isRequired,
    middle: PropTypes.string.isRequired,
    right: PropTypes.func, 
    left_title: PropTypes.string.isRequired,
    right_title: PropTypes.string,
  }
  
  render() {
    return (
      <Header transparent>
      <Left>
        <Button transparent>
          <Icon name={this.props.left_title} onPress={this.props.left}></Icon>
        </Button>
      </Left>
      <Body>
        <Title style={{color: "#fff", fontSize: 22, width: '150%'}}>{this.props.middle}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name={this.props.right_title} onPress={this.props.right}/>
        </Button>
      </Right>
    </Header>

    )
  }
}

export default CustomHeader