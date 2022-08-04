import React, { Component } from "react";

export default class FetchDataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    // .then((response) => response.json())
    //   .then((data) =>{
    //     this.setState({
    //         isLoaded: true,
    //         items: data.slice(1, 10),
    //       });
    //   });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      this.setState({
        isLoaded: true,
        items: json.slice(1, 10),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <h1 style={{ padding: "0 40% 0 40%" }}>FetchDataList</h1>
        {this.state.items.map((item) => (
          <div key={item.id}>
            <h2>Title: {item.title}</h2>
            <span>Body: {item.body}</span>
          </div>
        ))}
      </>
    );
  }
}
