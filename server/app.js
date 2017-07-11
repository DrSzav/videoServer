Meteor.startup(function() {
  Accounts.emailTemplates.siteName = 'Vew';
  Accounts.emailTemplates.from = 'Reset Password <drszav@getvew.com>';
});
