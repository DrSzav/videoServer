import React, { Component,PropTypes } from 'react';
import ReactIntl,{IntlProvider} from 'react-intl';
import {Email} from 'meteor/email';
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
        mapPoints:[],
        zoomLevel:[0],
        center:[ -0.2416815, 51.5285582 ]

    };
  }


  componentDidMount(){
    Meteor.call('getAllPoints', this.getPointsCallback.bind(this));

  }

  getPointsCallback(error,data){
    console.log(data);
    var url_string = window.location.href;
    var parseObj = this.parseURL(url_string);
    var vid = parseObj.vid;


    if(vid != null){
      var len = data.length;
      for(let i = 0; i < len; i++){
        if(data[i]._id == vid){
          this.setState({'mapPoints': [data[i]],
          'center':data[i].location.coordinates,
          'zoomLevel':[11]
        });
          return;
        }
      }}


    this.setState({'mapPoints':data});

  }

  render() {

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
      return (
        <div className=' center'>
        <h1>Vew the world.</h1>

        <div style={{
          marginTop:'25px',
          marginBottom:'25px'



        }}>
        <a href="https://itunes.apple.com/us/app/vew/id1153935071?ls=1&mt=8">
        <img className='appleLink' src={'images/appstore.svg'}></img>
        </a>
        </div>

          <div className='row black'>


            <Map
              attributionControl={false}
            style="mapbox://styles/mapbox/satellite-v9"
            zoom={this.state.zoomLevel}
            center={this.state.center}
            containerStyle={{
              height: "75vh",
              width: "100vw",
              marginLeft:'0px',
              marginRight:'0px',
              position:'absolute',

              right:'0vw'

            }}>

              {
            this.state.mapPoints.map((feature, key) =>
              <Marker
                key={key}
                coordinates={feature.location.coordinates}
              >
                <img className={'diamond'} src={'images/vewsPoint.png'} height={'20px'} width={'20px'}/>
              </Marker>
            )
            }

          </Map>



      </div>



    </div>
    )

}

  parseURL(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}



}
