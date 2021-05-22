import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Error from "./Error";
import Game from "./Game";
import  LoginIndex from "./login/index";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SnackbarProvider maxSnack={1}>
          <div>
            <Switch>
              <Route path="/game" component={Game} />
              <Route path="/login" component={LoginIndex} />
              <Route component={Error} />
            </Switch>
          </div>
        </SnackbarProvider>
      </BrowserRouter>
    );
  }
}

export default App;
