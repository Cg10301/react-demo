import React, { Component } from 'react';


export default class Popup extends Component {
  render() {
    return this.props.trigger ? (
        <div className="popup">
          <div className="popup-inner"> 
          <h2>{this.props.title}</h2>
            <button className="close-btn" onClick={() =>this.props.setTrigger()}>
              Close
            </button>
            {this.props.children}
          </div>
        </div>
      ) : (
        ""
      );
  }
}
