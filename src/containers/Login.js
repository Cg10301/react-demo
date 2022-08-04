import React, { Component } from 'react'
import "./Login.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
    }
    this.userNameOnChange = this.userNameOnChange.bind(this);
    this.passWordOnChange = this.passWordOnChange.bind(this);
    this.checkLoggin = this.checkLoggin.bind(this);
  }

  userNameOnChange(e){
    this.setState({userName: e.target.value});

  }
  passWordOnChange(e){
    this.setState({passWord: e.target.value});
  }

  checkLoggin(){
    if(this.state.userName === "cuong" && this.state.passWord === "123"){
      this.props.logginChange();
    }
    else{
      window.location.reload();
    }
  }

  render() {
    return (
      <div className='wrapper-login'>
        <h1 className='title text-center'>EXISTING LOGIN FORM</h1>
        <div className='inner-login'>
            <h1 style={{paddingTop: "50px"}}>LOGIN</h1>
            <input type='text' placeholder='UserName' onChange={this.userNameOnChange}></input>
            <input type='password' placeholder='Password' onChange={this.passWordOnChange}></input>

            <button className='btn btn-login btn-lg' onClick={this.checkLoggin}> LOGIN</button>
        </div>

      </div>
    )
  }
}
