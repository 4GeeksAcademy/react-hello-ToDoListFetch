import React, { useState } from "react";
import Input from "./Input";
import List from "./List";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  const url = "https://playground.4geeks.com/todo"; //URL base de la API que se usa para las peticiones

  function getTasks(user) { //llamar a la api para las tareas de usuario
    fetch(url + "/users/" + user) 
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setUsername(user); //Guardar nombre usuario
        setTasks(data.todos || []);
      });
  }

  function addTask(label) {
    if (label === "" || username === "") {
      return;
    }

    let task = {
      label: label,
      is_done: false
    };

    fetch(url + "/todos/" + username, { //eEnviar tarea con post
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (newTask) {
        setTasks([...tasks, newTask]);
      });
  }

  function deleteTask(id) { //Llamar a API para borrar tarea por id
    fetch(url + "/todos/" + id, {
      method: "DELETE"
    }).then(function () {
      let newList = tasks.filter(function (task) {
        return task.id !== id;
      });
      setTasks(newList);
    });
  }

  function deleteAllTasks() { //Para borrar todas las funciones
    // borramos una por una cada tarea
    const deletePromises = tasks.map(task =>
      fetch(url + "/todos/" + task.id, { method: "DELETE" })
    );

    Promise.all(deletePromises).then(() => {
      setTasks([]); // limpiar estado cuando termine todo
    });
  }

  return (
    <div className="container py-5">
      <h1 className="text-center">Xander's ToDo List</h1>

      <input
        className="form-control my-3"
        placeholder="Escribe tu nombre de usuario"
        onKeyDown={function (e) {
          if (e.key === "Enter") { // al presionar enter cargar las tareas de ese usuario
            getTasks(e.target.value.trim());
          }
        }}
      />

      <Input onAddTask={addTask} disabled={username === ""} //Mostrar Input pero desactivado si no hay usuario 
      /> 

      <List tasks={tasks} onDeleteTask={deleteTask} />

      {tasks.length > 0 && (
        <button
          className="btn btn-outline-danger mt-3"
          onClick={deleteAllTasks}
        >
          Eliminar todas las tareas
        </button>
      )}
    </div>
  );
};

export default Home;