import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/Main/Main';
import CountryPage from '../pages/Country/Country';
import VaccinationsPage from '../pages/Vaccinations/Vaccinations';

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
          component={CountryPage}
        />

        <Route
          exact
          path="/vaccines"
          component={VaccinationsPage}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
