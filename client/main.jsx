import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import MainControl from '../imports/ui/MainControl.jsx';

Meteor.startup(() => {
  render(<MainControl />, document.getElementById('render-target'));
});
