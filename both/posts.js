import { Mongo } from 'meteor/mongo';
//nodeOptions.push('--debug');
Vews = new Mongo.Collection('vews');
Comments = new Mongo.Collection('comment');
Logs = new Mongo.Collection('logs');
  function getDistance(lat1, lon1, lat2, lon2)
   {
     var R = 6371; // km
     var dLat = toRad(lat2-lat1);
     var dLon = toRad(lon2-lon1);
     var lat1 = toRad(lat1);
     var lat2 = toRad(lat2);

     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c;
     return d;
   }
/*
Methods to add,
changeUsername available(MeteorID,username), returns true and sets if username
*/
Meteor.methods({
  'uploadVew': function(postData) {
    Vews.insert({
      location:{
      type:"Point",
      coordinates:[postData['location']['coords']['longitude'],
      postData['location']['coords']['latitude']],
      uploadDate: new Date()
    },
      videoFile:postData['file'],
      thumbnailFile:postData['thumbnailFile']
    //  _id: new ObjectID()
    });
  //  return 1;
},

'addComment': function(data) {
  Comments.insert({
    username: data.username,
    comment: data.comment,
    date: new Date(),
    vewID: data.vewID
  });

},

'getComments': function(data) {
  var result = [];
  let coms = Comments.find(
      {vewID:data.vewID}
     ).forEach(function(obj){
    result.push(obj);
  });
  //console.log(result);
  return result;
},

  'getNearbyPoints': function(myLocation) {
    //return 0;
     var long = myLocation.position.longitude;
     var lat = myLocation.position.latitude;
     var result = [];
     let posts = Vews.find(

         {location:
          { $near :
             {
               $geometry: { type: "Point",  coordinates: [ long, lat ] },
              // $minDistance: 0,
             //  $maxDistance: 5000
             }
          }
        },{fields:{videoFile:0}}).forEach(function(obj){
          delete obj.videoFile;
          delete obj.thumbnailFile;
       result.push(obj);
     }
     )
     return result;
}
,
'getAllPoints': function(){
  var result = [];
  let posts = Vews.find({},{fields:{videoFile:0}}).forEach(function(obj){
    delete obj.videoFile;
    delete obj.thumbnailFile;
    result.push(obj);
  }
  )
  return result;

}

,
'getVew': function(data){
  let match = Vews.findOne({_id:data._id});
  return match;
}

});
