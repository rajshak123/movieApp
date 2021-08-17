import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../containers/HomeContainer';
import NotFound from '../elements/NotFound/NotFound';


const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;