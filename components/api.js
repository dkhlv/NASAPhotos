import REACT_APP_API_KEY from '../config'

const apiKey = REACT_APP_API_KEY
const apiHost = 'https://api.nasa.gov'

//TODO: create a photo search by date
//https://api.nasa.gov/planetary/apod?date=2018-06-06&api_key=

export default {
	async fetchDailyPhoto(date) {
		try {
			let response = await fetch(apiHost + '/planetary/apod?date=' + date + '&api_key=' + apiKey)
			let responseJson = await response.json()
		  return responseJson
		} catch (error) {
			console.error(error)
		}
	}
}