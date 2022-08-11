import React from "react";
import "./Main.css";
import "./popup.css";
import StudentList from "../components/StudentList";
import TopMenu from "../components/TopMenu";
import LeftMenu from "../components/Navbar";
import Footer from "../components/Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { v4 } from "uuid";
import Popup from "./Popup";
import FormError from "./FormError";

const STORAGE_KEY = "STUDENT_LIST";

const compareStr = function (key, input) {
  let arr = input.split(" ");

  for (var i = 0; i < arr.length; i++) {
    if (!key.includes(arr[i])) return false;
  }

  return true;
};

const validName = function (name) {
  for (let i = 0; i < name.length; i++) {
    let n = Number.parseInt(name[i]);
    if (Number.isInteger(n)) {
      return false;
    }
  }
  return true;
};

const validAge = function (age) {
  let i = Number.parseInt(age);
  let check = true;
  for (let i = 0; i < age.length; i++) {
    let n = Number.parseInt(age[i]);
    if (!Number.isInteger(n)) {
      check = false;
    }
  }
  if (check && i > 0 && i < 100) {
    return true;
  } else {
    return false;
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      PopupEditState: false,
      PopupAddState: false,

      editStudent: {
        id: 0,
        name: "",
        age: "",
        gender: "",
      },
      searchResults: "",
      selectedGender: {
        value: "",
      },
      name_input: {
        value: "",
        isInputInValid: false,
      },
      age_input: {
        value: 0,
        isInputInValid: false,
      },
    };
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onOpenPopupEditBtn = this.onOpenPopupEditBtn.bind(this);
    this.onClosePopupEditBtn = this.onClosePopupEditBtn.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.onOpenPopupAddBtn = this.onOpenPopupAddBtn.bind(this);
    this.onClosePopupAddBtn = this.onClosePopupAddBtn.bind(this);
    this.nameInputOnChange = this.nameInputOnChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onSelectGender = this.onSelectGender.bind(this);
    this.ageInputOnChange = this.ageInputOnChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://62eb9319705264f263db71a1.mockapi.io/student "
      );
      const json = await response.json();
      this.setState({
        studentList: json,
        searchResults: json,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmitAdd(event) {
    let Nname = event.target.elements.name.value;
    let Nage = event.target.elements.age.value;
    let Ngender = this.state.selectedGender;

    event.preventDefault();
    if (typeof Ngender === "object" || Ngender === "") {
      alert("Please choose gender!");
    } else {
      // let new_id = v4();
      let Ndata = { name: Nname, age: Nage, gender: Ngender };
      this.setState({
        studentList: [...this.state.studentList, Ndata],
        searchResults: [...this.state.searchResults, Ndata],
      });

      event.target.elements.name.value = "";
      event.target.elements.age.value = "";

      fetch("https://62eb9319705264f263db71a1.mockapi.io/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Ndata),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ students: [...this.state.studentList, data] });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      event.preventDefault();
      this.setState({ selectedGender: "" });
      this.setState({ name_input: { value: "" } });
      this.setState({ age_input: { value: "" } });
      this.setState({ PopupAddState: false });
    }
  }
  handleDelete(del_id) {
    let student = this.state.studentList.filter(
      (student) => student.id === del_id
    );
    let text = "Do you want to delete this student? \n" + student[0].name;
    if (window.confirm(text) === true) {
      let new_studentList = this.state.studentList.filter((student) => {
        return student.id !== del_id;
      });
      let new_searchResults = this.state.searchResults.filter((student) => {
        return student.id !== del_id;
      });
      this.setState({ studentList: new_studentList });
      this.setState({ searchResults: new_searchResults });
      fetch(`https://62eb9319705264f263db71a1.mockapi.io/student/${del_id}`, {
        method: "DELETE",
      }).then(() => {
        console.log("Delete successful");
      });
    }
  }

  onClosePopupEditBtn() {
    this.setState({ PopupEditState: false });
  }
  onClosePopupAddBtn() {
    this.setState({ PopupAddState: false });
  }
  handleSubmitEdit(event) {
    event.preventDefault();
    let Editname = event.target.elements.name.value;
    let Editage = event.target.elements.age.value;
    let Editgender = this.state.selectedGender;
    let EditedData = { name: Editname, age: Editage, gender: Editgender };

    if (typeof Editgender === "object" || Editgender === "") {
      alert("Please choose gender!");
    } else {
      [...this.state.studentList].map((student) => {
        if (student.id === this.state.editStudent.id) {
          student.name = Editname;
          student.age = Editage;
          student.gender = Editgender;
        }
        return student;
      });
      [...this.state.searchResults].map((student) => {
        if (student.id === this.state.editStudent.id) {
          student.name = Editname;
          student.age = Editage;
          student.gender = Editgender;
        }
        return student;
      });
      this.setState({ PopupEditState: false });
      fetch(
        `https://62eb9319705264f263db71a1.mockapi.io/student/${this.state.editStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(EditedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const Editedstudents = [...this.state.studentList].map((student) => {
            if (student.id === data.id) {
              student.name = data.name;
              student.age = data.age;
              student.gender = data.gender;
            }
            return student;
          });
          this.setState({ students: Editedstudents });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  onOpenPopupEditBtn(student_id) {
    this.setState({ PopupEditState: true });
    [...this.state.studentList].map((student) => {
      if (student.id === student_id) {
        this.setState({
          editStudent: {
            id: student.id,
            name: student.name,
            age: student.age,
            gender: student.gender,
          },
          selectedGender: student.gender,
        });
      }
      return student;
    });
  }
  onOpenPopupAddBtn() {
    this.setState({ PopupAddState: true });
    this.setState({ name_input: "" });
  }
  nameInputOnChange(e) {
    if (e.target.value === "") {
      this.setState({ name_input: { isInputInValid: false } });
      e.target.style.border = "2px solid black";
    } else {
      this.setState({ name_input: { value: e.target.value } });
      if (validName(e.target.value)) {
        this.setState({ name_input: { isInputInValid: false } });
        e.target.style.border = "2px solid green";
      } else {
        this.setState({ name_input: { isInputInValid: true } });
        e.target.style.border = "2px solid red";
      }
    }
  }
  ageInputOnChange(e) {
    let age = parseInt(e.target.value);
    if (e.target.value === "") {
      this.setState({ age_input: { isInputInValid: false } });
      e.target.style.border = "2px solid black";
    } else {
      this.setState({ age_input: { value: Number.parseInt(age) } });
      if (validAge(age)) {
        this.setState({ age_input: { isInputInValid: false } });
        e.target.style.border = "2px solid green";
      } else {
        this.setState({ age_input: { isInputInValid: true } });
        e.target.style.border = "2px solid red";
      }
    }
  }

  onSelectGender(e) {
    this.setState({ selectedGender: e.target.value });

    if (e.target.value === "") {
      e.target.style.border = "2px solid red";
    } else {
      e.target.style.border = "2px solid green";
    }
  }

  filterData(e) {
    let keyword = "";
    if (e.target.value !== undefined) {
      keyword = e.target.value;
    } else {
      keyword = "";
    }

    if (keyword !== "") {
      const results = this.state.studentList.filter((student) => {
        return compareStr(student.name.toLowerCase(), keyword.toLowerCase());
      });
      this.setState({ searchResults: results });
    } else {
      this.setState({ searchResults: this.state.studentList });
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <TopMenu filterData={this.filterData} />
          <LeftMenu />
          <div className="content">
            <div className="btn-add" onClick={this.onOpenPopupAddBtn}>
              <i
                className="fa fa-plus-circle"
                style={{ paddingRight: "10px" }}
              ></i>{" "}
              Create New
            </div>
            <div className="main-inner">
              <h1> Student List</h1>
              <div>
                {this.state.searchResults &&
                this.state.searchResults.length > 0 ? (
                  <StudentList
                    studentList={this.state.searchResults}
                    handleDelete={this.handleDelete}
                    onOpenPopupEditBtn={this.onOpenPopupEditBtn}
                  ></StudentList>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th></th>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            

            <Popup
              title={"Add Student"}
              trigger={this.state.PopupAddState}
              setTrigger={this.onClosePopupAddBtn}
            >
              <form className="addForm" onSubmit={this.handleSubmitAdd}>
                <label>Name: </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.nameInputOnChange}
                  required
                ></input>
                <FormError
                  isHidden={this.state.name_input.isInputInValid}
                  tag={"Name"}
                />
                <label>Age: </label>
                <input
                  type="text"
                  name="age"
                  onChange={this.ageInputOnChange}
                  required
                ></input>
                <FormError
                  isHidden={this.state.age_input.isInputInValid}
                  tag="Age"
                />

                <label>Gender: </label>

                <select
                  id="gender"
                  name="gender"
                  form="addForm"
                  onChange={this.onSelectGender}
                  defaultValue=""
                >
                  <option value="">--Choose an option--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  id="submit-btn"
                  type="submit"
                  value="Submit"
                  disabled={
                    this.state.name_input.isInputInValid ||
                    this.state.age_input.isInputInValid
                  }
                  style={{ margin: "15px" }}
                ></input>
              </form>
            </Popup>
            <Popup
              title={"Edit Student"}
              trigger={this.state.PopupEditState}
              setTrigger={this.onClosePopupEditBtn}
            >
              <form onSubmit={this.handleSubmitEdit}>
                <label>Name: </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={this.state.editStudent.name}
                  onChange={this.nameInputOnChange}
                  required
                ></input>
                <FormError
                  isHidden={this.state.name_input.isInputInValid}
                  tag={"Name"}
                />

                <label>Age: </label>
                <input
                  type="text"
                  name="age"
                  defaultValue={this.state.editStudent.age}
                  onChange={this.ageInputOnChange}
                  required
                ></input>
                <FormError
                  isHidden={this.state.age_input.isInputInValid}
                  tag="Age"
                />
                <label>Gender: </label>
                <select
                  id="gender"
                  name="gender"
                  form="addForm"
                  onChange={this.onSelectGender}
                  defaultValue={this.state.editStudent.gender}
                >
                  <option value="">--Choose an option--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  id="submit-btn"
                  type="submit"
                  value="Submit"
                  disabled={
                    this.state.name_input.isInputInValid ||
                    this.state.age_input.isInputInValid
                  }
                  style={{ margin: "15px" }}
                ></input>
              </form>
            </Popup>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Main;
