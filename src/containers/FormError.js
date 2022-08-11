import React, { Component } from 'react'

export default class FormError extends Component {
  render() {
    
    return this.props.isHidden ?(
      <div style={{color: 'red'}}>Invalid {this.props.tag}</div>
    ) : (" ");
    
  }
}
