require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTask,
  confirm,
  showListCheck,
} = require("./helpers/inquirer");
const { saveFile, readDB } = require("./helpers/saveFile");

const Task = require("./models/task");
const Tasks = require("./models/tasks");
//const { showMenu, pause } = require("./helpers/message.js");

console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();
  if (tasksDB) {
    tasks.loaderTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const des = await readInput("description");
        tasks.createTask(des);
        console.log("description:", des);
        break;
      case "2":
        tasks.listCompleteTasks();
        break;
      case "3":
        tasks.ListCompletePendingTasks(true);
        break;
      case "4":
        tasks.ListCompletePendingTasks(false);
        break;
      case "5":
        const ids = await showListCheck(tasks.listArray);

        tasks.toggleComplete(ids);
        break;
      case "6":
        const id = await listDeleteTask(tasks.listArray);
        if (id === "0") {
          continue;
        }
        const deleteConfirm = await confirm("¿Are you sure  ?");
        if (deleteConfirm) {
          tasks.deleteTask(id);
          console.log("Task deleted".white);
        }
        break;
    }

    saveFile(tasks.listArray);

    await pause();
  } while (opt !== "0");
};

main();
