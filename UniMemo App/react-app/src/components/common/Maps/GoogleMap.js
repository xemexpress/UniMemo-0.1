import React from 'react'

class GoogleMap extends React.Component {
  shouldComponentUpdate(){
    return false
  }

  componentDidMount(){
    const google = window.google
    if(this.props.startPlace){

    }
    this.geocoder = new google.maps.Geocoder()

    this.setGeocode = (results, status) => {
      if(status === google.maps.GeocoderStatus.OK){
        let coords = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }

        this.map = new google.maps.Map(this.refs.map, {
          center: coords,
          zoom: 11
        })
        this.marker = new google.maps.Marker({
          map: this.map,
          position: coords,
          animation: google.maps.Animation.DROP
        })
      }
    }

    this.geocoder.geocode({
      address: this.props.endPlace,
      region: 'hk'
    }, this.setGeocode)
  }

  render(){
    return (
      <div className='map' ref='map'/>
    )
  }
}

export default GoogleMap
