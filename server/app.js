Meteor.startup(function() {

});

Meteor.publish('posts', function() {
  return Posts.find();
});
