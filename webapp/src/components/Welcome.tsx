import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import logo from "../logo.svg";
import React, { Fragment, useState } from "react";
import mineral from '../images/minerales/coal-anthracite-380.jpg';
type FromElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}
type WelcomeProps = {
  message: string;
};

function Welcome(props: WelcomeProps): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FromElement) => {
    e.preventDefault();
    console.log(newTask);
    addTask(newTask);
    setNewTask("");
    console.log(tasks);
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };
  return (
    <div className="container">
      <div className="row">
      <div className="col">
         <img src={mineral} alt="" />
      </div>
      </div>  
    </div>
  );
}

export default Welcome;
