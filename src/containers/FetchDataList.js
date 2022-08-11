import React, { Component } from "react";
import StudentList from "../components/StudentList";



export default class FetchDataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onSubmitAdd = this.onSubmitAdd.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  async componentDidMount() {
    // fetch("https://62eb9319705264f263db71a1.mockapi.io/student")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       isLoaded: true,
    //       items: data,
    //     });
    //   });
    try {
      const response = await fetch(
        "https://62eb9319705264f263db71a1.mockapi.io/student "
      );
      const json = await response.json();
      this.setState({
        items: json,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmitAdd(e) {
    e.preventDefault();
    let Nname = e.target.elements.name.value;
    let Nage = e.target.elements.age.value;
    let Ngender = e.target.elements.gender.value;

    let Ndata = { name: Nname, age: Nage, gender: Ngender };
    fetch("https://62eb9319705264f263db71a1.mockapi.io/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Ndata),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: [data, ...this.state.items] });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  onClickDelete(id) {
    fetch(`https://62eb9319705264f263db71a1.mockapi.io/student/${id}`, {
      method: "DELETE",
    }).then(() => {
      let new_items = this.state.items.filter((item) => {
        return item.id !== id;
      });
      this.setState({ items: new_items });
    });
  }

  onSubmitEdit(e) {
    e.preventDefault();
    let Eid = e.target.elements.Edit_id.value;
    let Ename = e.target.elements.Edit_name.value;
    let Eage = e.target.elements.Edit_age.value;
    let Egender = e.target.elements.Edit_gender.value;

    let Edata = { name: Ename, age: Eage, gender: Egender };

    fetch(`https://62eb9319705264f263db71a1.mockapi.io/student/${Eid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edata),
    })
      .then((response) => response.json())
      .then((data) => {
        const EditedItems = [...this.state.items].map((item) => {
          if (item.id === data.id) {
            item.name = data.name;
            item.age = data.age;
            item.gender = data.gender;
          } 
          return item;
        });
        this.setState({items: EditedItems});
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <>
        <h1 style={{ padding: "0 40% 0 40%" }}>FetchDataList</h1>

        <StudentList
          studentList={this.state.items}
          handleDelete={this.onClickDelete}
        ></StudentList>

        <h1>Add Student</h1>
        <form onSubmit={this.onSubmitAdd}>
          <label>Name:</label>
          <input type="text" name="name"></input>
          <label>Age:</label>
          <input type="text" name="age"></input>
          <label>Gender:</label>
          <input type="text" name="gender"></input>
          <input type="submit" value="Submit"></input>
        </form>

        <h1>Edit Student</h1>
        <form onSubmit={this.onSubmitEdit}>
          <label>ID:</label>
          <input type="text" name="Edit_id"></input>
          <label>Name:</label>
          <input type="text" name="Edit_name"></input>
          <label>Age:</label>
          <input type="text" name="Edit_age"></input>
          <label>Gender:</label>
          <input type="text" name="Edit_gender"></input>
          <input type="submit" value="Submit"></input>
        </form>

       
      </>
    );
  }
}
