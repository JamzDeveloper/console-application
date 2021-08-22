const Task = require("./task");

class Tasks {
  _listado = {};

  constructor() {
    this._listado = {};
  }
  deleteTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  loaderTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._listado[task.id] = task;
    });
  }

  get listArray() {
    const list = [];
    Object.keys(this._listado).forEach((key) => {
      const task = this._listado[key];
      list.push(task);
    });
    return list;
  }
  createTask(desc = "") {
    const task = new Task(desc);
    this._listado[task.id] = task;
  }

  listCompleteTasks() {
    this.listArray.forEach((task, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completeIn } = task;
      const state = completeIn ? `completed`.green : "pending".red;
      console.log(`${idx} - ${desc} - ${state}`);
    });
  }
  ListCompletePendingTasks(complete = false) {
    let contador = 1;
    this.listArray.forEach((task) => {
      const { desc, completeIn } = task;

      if (complete) {
        if (completeIn) {
          const idx = `${contador}`.green;
          console.log(`${idx} - ${desc} - ${completeIn.green}`);
          contador++;
        }
      } else {
        if (!completeIn) {
          const idx = `${contador}`.green;
          console.log(`${idx} - ${desc} - ${"pending".red}`);
          contador++;
        }
      }
    });
  }
  toggleComplete(ids = []) { 
    ids.forEach((id) => {
      const task = this._listado[id];

      if (!task.completeIn) {
        task.completeIn = new Date().toISOString();
      }
    });

    this.listArray.forEach(task => {

      if(!ids.includes(task.id)) {
        this._listado[task.id].completeIn = null;
      }
      
    });
  }
}

module.exports = Tasks;
