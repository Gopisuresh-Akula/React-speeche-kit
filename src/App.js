import React, { useContext,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css'
import Home from "./components/Home/Home";
import FormPage from "./components/FormPage/FormPage";
import { Appcontext } from "./components/Context/ContextProvider";


const App = () => {

  const { listen, stop, command, Listening,setListening,setcommand } = useContext(Appcontext);
  useEffect(() => {
    setcommand();
  }, [Listening===false])// eslint-disable-line react-hooks/exhaustive-deps



  return (
    <Router>
   <div  className="speeche-button"   onClick={() => {
            setListening(!Listening);
            !Listening ? listen() : stop();
          }}>
 {  command&& <div className="speeche-content">{command}</div>}
  </div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/FormPage" component={FormPage} />
   
      </Switch>
    </Router>
  );
};

export default App;
