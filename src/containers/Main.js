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


const STORAGE_KEY = "STUDENT_LIST";

const compareStr = function (key, input) {
  let arr = input.split(" ");

  for (var i = 0; i < arr.length; i++) {
    if (!key.includes(arr[i])) return false;
  }

  return true;
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      PopupEditState: false,
      PopupAddState: false,
      name_input: "",
      editStudent: {
        id: 0,
        name: "",
        age: "",
        gender: "",
      },
      searchResults: "",
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
  }

  componentDidMount() {
    const storagedStudentList = localStorage.getItem(STORAGE_KEY);
    
    if (storagedStudentList) {
      this.setState({ studentList: JSON.parse(storagedStudentList) });
      this.setState({ searchResults: JSON.parse(storagedStudentList) });
    }
  }

  handleSubmitAdd(event) {
    let Nname = event.target.elements.name.value;
    let Nage = event.target.elements.age.value;
    let Ngender = event.target.elements.gender.value;
    if (Nname !== "") {
      let new_id = v4();
      this.setState({
        studentList: [
          {
            id: new_id,
            name: Nname,
            age: Nage,
            gender: Ngender,
          },
          ...this.state.studentList,
        ],
      });
      this.setState({
        searchResults: [
          {
            id: new_id,
            name: Nname,
            age: Nage,
            gender: Ngender,
          },
          ...this.state.searchResults,
        ],
      });
      event.preventDefault();
      event.target.elements.name.value = "";
      event.target.elements.age.value = "";
      event.target.elements.gender.value = "";
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          {
            id: new_id,
            name: Nname,
            age: Nage,
            gender: Ngender,
          },
          ...this.state.studentList,
        ])
      );
    } else {
      alert("Name is empty!");
    }
    this.setState({ PopupAddState: false });
  }
  handleDelete(del_id) {
    let student = this.state.studentList.filter(student => student.id === del_id)
    let text = "Do you want to delete this student? \n" + student[0].name;
    if (window.confirm(text) === true) {
      let new_studentList = this.state.studentList.filter((student) => {
        return student.id !== del_id;
      });
      let new_searchResults = this.state.searchResults.filter((student) => {
        return student.id !== del_id;
      });
      this.setState({ studentList: new_studentList });
      this.setState({searchResults: new_searchResults });
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...new_studentList]));
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
    const editedStudent = [...this.state.studentList].map((student) => {
      if (student.id === this.state.editStudent.id) {
        student.name = event.target.elements.edit_name.value;
        student.age = event.target.elements.edit_age.value;
        student.gender = event.target.elements.edit_gender.value;
      }
      return student;
    });
    [...this.state.searchResults].map((student) => {
      if (student.id === this.state.editStudent.id) {
        student.name = event.target.elements.edit_name.value;
        student.age = event.target.elements.edit_age.value;
        student.gender = event.target.elements.edit_gender.value;
      }
      return student;
    });
    this.setState({ PopupEditState: false });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(editedStudent));
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
    this.setState({ name_input: e.target.value });
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
      // console.log(this.state.studentList);
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <TopMenu filterData={this.filterData} />
          <LeftMenu />
          <div className="content">
            <span
              onClick={this.onOpenPopupAddBtn}
              style={{
                fontSize: "30px",
                padding: "20px",
                color: "rgba(1,1,1,0.5)",
                cursor: "pointer",
              }}
            >
              <i className="fa fa-user-plus"></i>
            </span>
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
                <h1>No results found!</h1>
              )}
            </div>

            {/* <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav> */}
           
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
                <label>Age: </label>
                <input type="text" name="age"></input>
                <label>Gender: </label>
                <input type="text" name="gender"></input>
                <input
                  type="submit"
                  value="Submit"
                  disabled={!this.state.name_input}
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
                  id="edit_name"
                  type="text"
                  name="edit_name"
                  defaultValue={this.state.editStudent.name}
                  required
                ></input>
                <label>Age: </label>
                <input
                  id="edit_age"
                  type="text"
                  name="edit_age"
                  defaultValue={this.state.editStudent.age}
                ></input>
                <label>Gender: </label>
                <input
                  id="edit_gender"
                  type="text"
                  name="edit_gender"
                  defaultValue={this.state.editStudent.gender}
                ></input>
                <input
                  type="submit"
                  value="Submit"
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


