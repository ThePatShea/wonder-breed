import React from 'react';
import AutoMatcher from '../components/AutoMatcher/AutoMatcher';
import InvalidAccessCode from '../components/InvalidAccessCode/InvalidAccessCode';
import AppHeader from '../components/AppHeader/AppHeader';
import { ThemeProvider } from '@mui/material/styles';
import { grantAccess } from '../helpers/grantAccess';
import { appTheme } from '../helpers/appTheme';

const MatchPage = (props) => {
  return (
    <ThemeProvider theme={appTheme}>
      <AppHeader/>
      { grantAccess(props) ? <AutoMatcher/>: <InvalidAccessCode/> }
    </ThemeProvider>
  )
}

export default MatchPage;
