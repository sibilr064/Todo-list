import {
  faCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// const items = ["hai", "hello"];

export default function TodoList() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  function handleClickAdd(e) {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      text: item,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setItem("");
  }

  function handleClickDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id, newText) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }

  return (
    <div className="main">
      <h1>To Do List</h1>
      <form>
        <input
          className="add-task"
          placeholder="Add a new task..."
          value={item}
          type="text"
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="add-button" onClick={handleClickAdd}>
          Add
        </button>
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleClickDelete={handleClickDelete}
              handleUpdateItem={handleUpdateItem}
            />
          ))}
        </ul>
      </form>
    </div>
  );
}

function Item({ item, handleClickDelete, handleUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [isChecked, setIsChecked] = useState(false);

  function handleClickEdit(id) {
    setIsEditing((e) => !e);
  }

  function handleConfirmEdit() {
    handleUpdateItem(item.id, editedText);
    setIsEditing((e) => !e);
  }

  function handleCheckBoxChange() {
    setIsChecked((e) => !e);
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="add-task"
          />
          <button className="button-delete" type="button">
            <FontAwesomeIcon icon={faCheck} onClick={handleConfirmEdit} />
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckBoxChange}
          />
          <p className={isChecked ? "strike" : ""}>{item.text}</p>
        </>
      )}
      {isEditing ? (
        ""
      ) : (
        <button className="button-delete" type="button">
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => handleClickEdit(item.id)}
          />
        </button>
      )}
      {isEditing ? (
        ""
      ) : (
        <button className="button-delete" type="button">
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => handleClickDelete(item.id)}
          />
        </button>
      )}
    </li>
  );
}
