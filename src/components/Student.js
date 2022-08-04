import React, { Component } from 'react'
import "../containers/Main.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Student extends Component {
  render() {
    return (
      <>
      <tr>
        <td> {this.props.student.name}</td>
        <td> {this.props.student.age}</td>
        <td> {this.props.student.gender}</td>
        <td style={{width: "70px"}}>
          <span style={{padding: "5px", cursor: "pointer", color: "red"}} onClick={() => {this.props.handleDelete(this.props.student.id)}}><i className="fa fa-trash"></i></span>
          <span style={{padding: "5px", cursor: "pointer", color: "blue"}} onClick={()=> {this.props.onOpenPopupEditBtn(this.props.student.id)}}><i className="fa fa-edit"></i></span>
        </td>
      </tr>
      </>
    )
  }
}
