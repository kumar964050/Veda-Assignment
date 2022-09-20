import { useState } from "react";
import useLocalStorage from "use-local-storage";

import { v4 as uuidV4 } from "uuid";

import EachTask from "../EachTask";

import "./index.css";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [listDetails, setListDetails] = useLocalStorage("tasks", []);

  const onAddList = (e) => {
    e.preventDefault();

    const id = uuidV4();
    var x = listDetails.length - 1;
    var position = 1;
    if (listDetails.length !== 0) {
      position = listDetails[x].position + 1;
    }
    const arrTask = [...listDetails, { id, text: userInput, position }];
    setListDetails(arrTask);
    setUserInput("");
  };

  const onDeleteTask = (id) => {
    const filterData = listDetails.filter((eachItem) => eachItem.id !== id);
    setListDetails(filterData);
  };

  const isUpPosition = (id) => {
    const xIndex = listDetails.findIndex((obj) => obj.id === id);
    const yIndex = xIndex - 1;
    if (listDetails[xIndex].position > 1) {
      const xP = listDetails[xIndex].position;
      const yP = listDetails[yIndex].position;
      listDetails[yIndex].position = xP;
      listDetails[xIndex].position = yP;
      setListDetails(listDetails);
    }
  };

  const isDownPosition = (id) => {
    const xIndex = listDetails.findIndex((obj) => obj.id === id);
    const yIndex = xIndex + 1;
    if (listDetails[listDetails.length - 1].id !== id) {
      const xP = listDetails[xIndex].position;
      const yP = listDetails[yIndex].position;
      listDetails[yIndex].position = xP;
      listDetails[xIndex].position = yP;
      setListDetails(listDetails);
    }
  };

  const onRenderListItems = () => {
    listDetails.sort((a, b) => {
      return a.position - b.position;
    });
    return (
      <ul className='list-container'>
        {listDetails.map((eachItem) => (
          <EachTask
            key={eachItem.id}
            data={eachItem}
            onDeleteTask={onDeleteTask}
            listDetails={listDetails}
            isUpPosition={isUpPosition}
            isDownPosition={isDownPosition}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className='home-container'>
      {onRenderListItems()}
      <form onSubmit={onAddList} className='input-container'>
        <input
          required
          type='text'
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button type='submit' className='icons btn'>
          Add
        </button>
      </form>
    </div>
  );
};

export default Home;
