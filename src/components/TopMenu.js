import React, { Component } from 'react';
import "../containers/Main.css";
import 'font-awesome/css/font-awesome.min.css';




export default class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarStatus: true,
      
    };
    this.searchText = React.createRef();
    this.searchClickBtn = this.searchClickBtn.bind(this);
    
  }


  searchClickBtn(e){
    this.state.searchBarStatus ?this.setState({searchBarStatus: false}) : this.setState({searchBarStatus: true}) ;
    this.searchText.current.value = ""; 
    this.props.filterData(e);
  }

  
  render() {
    return (
      <div className="header">
        <span ><i className="fa fa-home"></i></span> 
        <span onClick={this.searchClickBtn }><i className="fa fa-search"></i></span> 
        <input
        id="search"
        type="search"
        hidden={this.state.searchBarStatus}
        onChange={this.props.filterData}
        placeholder="Search"
        ref={this.searchText}
      />
      </div>
    )
  }
}
