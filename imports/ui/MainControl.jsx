import React, { Component,PropTypes } from 'react';
import ReactIntl,{IntlProvider} from 'react-intl';

var FormattedRelative = ReactIntl.FormattedRelative;
import ReactDOM from 'react-dom';

// ES6
import ReactMapboxGl, { Layer, Feature, Marker, Cluster } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZHJzemF2IiwiYSI6ImNpcnZjMGljNTBpbGpmZm04eTVqamxzYnEifQ.M9EzE1kvwpnsWgQx1mfLLw"
});


export default class MainControl extends Component {

  constructor(props) {
    super(props);
    this.i = 0;
    this.state = {
        mapPoints:[]

    };
  }

  clusterMarker(coordinates,key){ return(
    <Marker coordinates={coordinates} key={key}>
      <img src={'images/vewsPoint.png'} height={'20'} width={'20'}/>
  </Marker>
  );
  }

  componentDidMount(){
    Meteor.call('getAllPoints', this.getPointsCallback.bind(this));
  }

  getPointsCallback(error,data){
    console.log(data);
    this.setState({'mapPoints':data})
  }

  render() {

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
      return (
        <div className='container center'>
        <h1>Vew the world.</h1>
          <div className='row black'>
            <div className='black'>

            <Map
              attributionControl={false}
            style="mapbox://styles/mapbox/satellite-v9"
            zoom={[0]}
            containerStyle={{
              height: "70vh",
              width: "70vh",
              marginLeft:'auto',
              marginRight:'auto',
              border: 'solid',
              borderRadius:'20px',
              borderWidth:'10px',
              borderColor:'#7d70e8'

            }}>
          <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {
            this.state.mapPoints.map((feature, key) =>
              <Marker
                key={key}
                coordinates={feature.location.coordinates}
              >
                <img src={'images/vewsPoint.png'} height={'20px'} width={'20px'}/>
              </Marker>
            )
            }
          </Cluster>
          </Map>


        </div>
      </div>
      <div style={{
        padding:'20px'

      }}>
      <img src={'images/appstore.svg'}></img>
      </div>

    </div>
    )

}
}
