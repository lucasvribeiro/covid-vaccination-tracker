import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/Main/Main';
import CountryPage from '../pages/Country/Country';
import VaccinationsPage from '../pages/Vaccinations/Vaccinations';
import PercentagesPage from '../pages/Percentages/Percentages';

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

        <Route
          exact
          path="/percentages"
          component={PercentagesPage}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
