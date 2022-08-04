import React, { Component } from 'react'
import "../containers/Main.css";


export default class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onClick(e){
    e.preventDefault();
  }

  render() {
    return (
    <>
      
      <div className='Sider'>
        <a href="/" >Infomation</a>
        <a href="/fetchdata" >FetchList</a>
        <a href="#item1">Item1</a>
        <a href="#item2">Item2</a>
      </div>
      </>
    )
  }
}
