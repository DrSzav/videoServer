import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.emailTemplates.siteName = 'Vew';
  Accounts.emailTemplates.from = 'Reset Password <no-reply@getvew.com>';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.env.MAIL_URL = 'smtp://localhost:25';
});
