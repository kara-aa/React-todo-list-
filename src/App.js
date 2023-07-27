import "./App.css";
import { useState } from "react";

function Header({ onAddTask }) {

  function handleInputValue() {
    let input = document.querySelector('input');
    if (input.value.length > 0 & input.value !== ' ')
      onAddTask(input.value);
    input.value = '';
  }

  return (
    <div className="header">
      <div className="logo">
        <div className="logo-img"></div>
        <div className="logo-text">todo</div>
      </div>
      <div className="for-new-task">
        <input type="text" name="inputTask" onKeyDown={e => (e.keyCode === 13) ? handleInputValue() : false} placeholder="Type new task" />
        <button className="btn_add" onClick={handleInputValue}>
          Add task
        </button>
      </div>
    </div>
  );
}

function Body({ arrTasks, onDeleteTask, onCheckedTask }) {
  const counter = arrTasks.length;
  const counterDones = arrTasks.filter(task => task.done).length;

  const tasks = arrTasks.map((task, index) => {
    return (
      <li key={index} className={task.done ? 'done' : ''}>
        <Task text={task.text} index={index} onDeleteTask={onDeleteTask} onCheckedTask={onCheckedTask}></Task>
      </li>
    );
  });

  const isTaskList = getBody();

  function getBody() {
    if (counter === 0) {
      return (
        <div className="default-body">
          <div className="default-img"></div>
          <p>
            You don't have any registered tasks yet. <br />
            <span>Create tasks and organize your affairs.</span>
          </p>
        </div>
      );
    }
    else {
      return (
        <>
          <ul>{tasks}</ul>
        </>
      );
    }
  }

  return (
    <div>
      <div className="title">
        <div className="title-1">
          All tasks <span>{counter}</span>
        </div>
        <div className="title-2">
          Completed <span>{counterDones} from {counter}</span>
        </div>
      </div>

      <div className="body">
        {isTaskList}
      </div>
    </div>
  );
}

function Task({ text, onDeleteTask, onCheckedTask, index }) {

  return (
    <div className="task-item">
      <button className="btn btn_check" onClick={() => onCheckedTask(index)}></button>
      <div className="text">{text}</div>
      <button className="btn_delete" onClick={() => onDeleteTask(index)}></button>
    </div>
  );
}

function App() {
  const [tasks, addTask] = useState([]);

  function handleAddTask(text) {
    const newTasks = tasks.slice();
    newTasks.unshift({text: text, done: false});
    addTask(newTasks);
  }

  function handleDeleteTask(index) {
    const newTasks = tasks.slice();
    newTasks.splice(index, 1);
    addTask(newTasks);
  }

  function handleCheckedTask(index) {
    const updatedTasks = tasks.slice();
    updatedTasks[index].done = !tasks[index].done;
    addTask(updatedTasks);
  }

  return (
    <div className="main-w">
      <Header onAddTask={handleAddTask}></Header>
      <Body arrTasks={tasks} onDeleteTask={handleDeleteTask} onCheckedTask={handleCheckedTask}></Body>
    </div>
  );
}

export default App;
