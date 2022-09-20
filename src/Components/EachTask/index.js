import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";

import "./index.css";

const EachTask = (props) => {
  const { data, onDeleteTask, listDetails, isUpPosition, isDownPosition } =
    props;

  const onTasKRemove = () => {
    onDeleteTask(id);
  };

  const onUpPosition = () => {
    isUpPosition(id);
  };

  const onDownPosition = () => {
    isDownPosition(id);
  };
  const { id, text } = data;
  let L = listDetails.length - 1;

  const startPosition = listDetails[0].id === id ? "none" : "";
  const endPosition = listDetails[L].id === id ? "none" : "";

  return (
    <li className='display-container'>
      <p>{text}</p>
      <button onClick={onUpPosition} type='button' className='btn'>
        <AiFillCaretUp fontSize={24} className={`${startPosition} icons`} />
      </button>
      <button onClick={onDownPosition} type='button' className='btn'>
        <AiFillCaretDown fontSize={24} className={`${endPosition} icons`} />
      </button>
      <button onClick={onTasKRemove} type='button' className='btn'>
        <BsXLg className='icons' color='red' />
      </button>
    </li>
  );
};

export default EachTask;
