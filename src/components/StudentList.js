import React, { Component } from 'react'
import Student from './Student'
import "../containers/Main.css";

export default class StudentList extends Component {
  render() {
    return (
      <>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th></th>
        </tr>
        {this.props.studentList.map((student) => (
            <Student key={student.id} student={student} handleDelete = {this.props.handleDelete} onOpenPopupEditBtn={this.props.onOpenPopupEditBtn}/>
        ))}
        </tbody>
        </table>
      </>
    )
  }
}
