Template.home.onCreated(function() {
  this.subscribe('vews');
});

Template.home.helpers({
  count() {
    return Vews.find().count();
  }
});

Template.home.events({
  'click #increment': function(e) {
    e.preventDefault();

    Meteor.call('poop');
  },

  'click #decrement': function(e) {
    e.preventDefault();

    Meteor.call('deletePost');
  }
})
