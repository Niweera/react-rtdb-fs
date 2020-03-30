import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store, { rrfProps } from "./store";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Route exact path={"/"} component={Dashboard} />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
