import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FetchDataList from "./containers/FetchDataList";
import Login from "./containers/Login";
import Main from "./containers/Main";


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
        logginStatus: true,
      }
      this.logginChange = this.logginChange.bind(this);
    }

  logginChange(){
    this.setState({logginStatus: true});
    console.log("loggined");
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          {this.state.logginStatus ? (
            <Route exact path="/"  element={<Main />} />
          ) : <Route exact path="/" element={<Login logginChange = {this.logginChange}/>} />}
          <Route exact path="/fetchdata" element={<FetchDataList />} />
          
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
