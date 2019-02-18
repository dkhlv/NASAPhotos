import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Title, Content, Button, Text, Spinner } from "native-base"
import SinglePhoto from './components/SinglePhoto'
import PhotoList from './components/PhotoList'
import CustomHeader from './components/CustomHeader'
import api from './components/api'

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { photos: [], 
                    randomPhotos: [],
                    selectedPhotoID: null, 
                    randomSelected: false}
    this.formatDate = this.formatDate.bind(this)
  }
  
  async componentDidMount() {
    let photolist = []
    let curDate = this.formatDate(new Date())
    let day  = parseInt(curDate.slice(-2), 10)
    for (let i = day-1; i>0; i--) {
      let photo = await api.fetchDailyPhoto(curDate.slice(0,8) + i )
        // console.log(photo)
        photolist.push(
          {url: photo.url,
           date: photo.date,
           title: photo.title,
           explanation: photo.explanation,
           key: photo.date}
         )
    }
    this.setState({ photos: photolist})
    // choose 5 random photos to display later if selected
    let randoms = []
    for (var i = 0; i < 10; i++){
      let randomDate = '2018-' + (Math.floor(Math.random() * 12) + 1) + '-' + (Math.floor(Math.random() * 28) + 1)
      //console.log(randomDate)
      let photo = await api.fetchDailyPhoto(randomDate)
      randoms.push(
        {url: photo.url,
         date: photo.date,
         title: photo.title,
         explanation: photo.explanation,
         key: photo.date}
       )
    }
    this.setState({ randomPhotos: randoms})

  }
  
  formatDate(date) {
    let formattedDate = date.toISOString().split('T')[0]
    return date.toISOString().split('T')[0]
  }
  
  selectPhoto = (id) => {
    this.setState( {selectedPhotoID: id})
  }

  unselectPhoto = (id) => {
    this.setState( {randomSelected: false} )
    this.setState( {selectedPhotoID: null} )
  }
  
  getSelectedPhoto = () => {

      console.log("searching...")
      if (this.state.randomSelected){
        for (var i = 0; i < this.state.randomPhotos.length; i++) {
          if (this.state.randomPhotos[i].key === this.state.selectedPhotoID){
              return this.state.randomPhotos[i]
          }
        }
      }
      for (var i = 0; i < this.state.photos.length; i++) {
      //  console.log(this.state.photos[i].key)
        if (this.state.photos[i].key === this.state.selectedPhotoID){
            return this.state.photos[i]
        }
      }

    return ""
  }
  
  chooseRandom = () => {
    console.log('selecting random')
    let index = Math.floor(Math.random() * 10)
    let randomDate = this.state.randomPhotos[index].key
    this.setState({randomSelected: true})
    this.setState( {selectedPhotoID: randomDate})
  }
  
  savePhoto = () => {
    console.log('saving')
  }
 
 getMonthYear(){
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
   var d = new Date();
   return months[d.getMonth()] + " " + d.getFullYear()
 }

  render() {
    
    //User selected a photo to view
    if (this.state.selectedPhotoID !== null || this.state.randomSelected){
      return (
          <Container style={{backgroundColor: "#000"}}>
          <CustomHeader left={this.unselectPhoto} 
                        middle={this.state.selectedPhotoID}
                        right={this.savePhoto}
                        left_title="arrow-back"
                        right_title="save"/>
            <Content transparent padder >
            <ScrollView>
              <SinglePhoto photo={this.getSelectedPhoto()}/> 
            </ScrollView>
            </Content>
          </Container>
      )
    }
    
    //default view
    return (
      <Container style={{backgroundColor: "#000"}}>
      <CustomHeader left={this.chooseRandom} 
                    middle={this.getMonthYear()}
                    left_title="sync"/>
        <Content padder>
              <PhotoList onItemPress={this.selectPhoto} data={this.state.photos}/>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

