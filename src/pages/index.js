import React from 'react';
import PairSimulator from '../components/PairSimulator/PairSimulator';
import InvalidAccessCode from '../components/InvalidAccessCode/InvalidAccessCode';
import AppHeader from '../components/AppHeader/AppHeader';
import { ThemeProvider } from '@mui/material/styles';
import { grantAccess } from '../helpers/grantAccess';
import { appTheme } from '../helpers/appTheme';

const IndexPage = (props) => {
  return (
    <ThemeProvider theme={appTheme}>
      <AppHeader/>
      { grantAccess(props) ? <PairSimulator location={props.location}/> : <InvalidAccessCode/> }
    </ThemeProvider>
  )
}

export default IndexPage;
