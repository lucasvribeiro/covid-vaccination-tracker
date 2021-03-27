import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/Main/Main';
import CountryPage from '../pages/Country/Country';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route
          exact
          path="/country/:iso"
          render={({
            match,
          }) => (
            <CountryPage match={match} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
