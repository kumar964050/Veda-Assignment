import { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import { reactLocalStorage } from "reactjs-localstorage";

import EachTask from "../EachTask";

import "./index.css";

const startArr = [
  {
    id: uuidV4(),
    text: "Welcome",
    position: 1,
  },
];

class Home extends Component {
  state = {
    userInput: "",
    listDetails: [],
  };

  componentDidMount() {
    this.onGettingTask();
  }

  onGettingTask = () => {
    try {
      this.setState({
        listDetails: JSON.parse(reactLocalStorage.get("task")),
      });
    } catch (error) {
      this.setState({
        listDetails: startArr,
      });
    }
  };

  onUserInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  onAddList = (e) => {
    e.preventDefault();
    const { userInput, listDetails } = this.state;
    const id = uuidV4();
    var x = listDetails.length - 1;
    var position = 1;
    if (listDetails.length !== 0) {
      position = listDetails[x].position + 1;
    }
    const arrTask = [...listDetails, { id, text: userInput, position }];
    reactLocalStorage.set("task", JSON.stringify(arrTask));
    this.setState({
      userInput: "",
      listDetails: JSON.parse(reactLocalStorage.get("task")),
    });
  };

  onDeleteTask = (id) => {
    const { listDetails } = this.state;
    const filterData = listDetails.filter((eachItem) => eachItem.id !== id);
    reactLocalStorage.set("task", JSON.stringify(filterData));
    this.setState({
      listDetails: JSON.parse(reactLocalStorage.get("task")),
    });
  };

  isUpPosition = (id) => {
    const { listDetails } = this.state;
    const xIndex = listDetails.findIndex((obj) => obj.id === id);
    const yIndex = xIndex - 1;
    if (listDetails[xIndex].position > 1) {
      const xP = listDetails[xIndex].position;
      const yP = listDetails[yIndex].position;
      listDetails[yIndex].position = xP;
      listDetails[xIndex].position = yP;
      reactLocalStorage.set("task", JSON.stringify(listDetails));
      this.setState({
        listDetails: JSON.parse(reactLocalStorage.get("task")),
      });
    }
  };

  isDownPosition = (id) => {
    const { listDetails } = this.state;
    const xIndex = listDetails.findIndex((obj) => obj.id === id);
    const yIndex = xIndex + 1;
    if (listDetails[listDetails.length - 1].id !== id) {
      const xP = listDetails[xIndex].position;
      const yP = listDetails[yIndex].position;
      listDetails[yIndex].position = xP;
      listDetails[xIndex].position = yP;
      reactLocalStorage.set("task", JSON.stringify(listDetails));
      this.setState({
        listDetails: JSON.parse(reactLocalStorage.get("task")),
      });
    }
  };

  onRenderListItems = () => {
    const { listDetails } = this.state;

    try {
      listDetails.sort((a, b) => {
        return a.position - b.position;
      });
      return (
        <ul className='list-container'>
          {listDetails.map((eachItem) => (
            <EachTask
              key={eachItem.id}
              data={eachItem}
              onDeleteTask={this.onDeleteTask}
              listDetails={listDetails}
              isUpPosition={this.isUpPosition}
              isDownPosition={this.isDownPosition}
            />
          ))}
        </ul>
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { userInput } = this.state;
    return (
      <div className='home-container'>
        {this.onRenderListItems()}
        <form onSubmit={this.onAddList} className='input-container'>
          <input
            required
            type='text'
            onChange={this.onUserInput}
            value={userInput}
          />
          <button type='submit' className='icons btn'>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
