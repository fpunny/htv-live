import React, { useState } from 'react';
import moment from 'moment';
import { Page, Calendar, Description } from './components';
import schedule from './schedule';
import './styles/index.scss';

const now = schedule.findIndex(({ date }) => date === moment().format('DD/MM/YY'));
const App = () => {
  const activeState = useState(Math.max(now, 0));
  const [ selected, setSelected ] = useState(null);
  const [ active ] = activeState;

  return (
    <Page state={ activeState }>
      <Calendar active={ active } select={ setSelected }/>
      <Description selected={ selected }/>
    </Page>
  );
};

export default App;
