const inquirer = require("inquirer");
require("colors");

const question = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} create task`,
      },
      {
        value: "2",
        name: `${"2.".green} show all tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} show all completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} show all pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} complete task`,
      },
      {
        value: "6",
        name: `${"6.".green} delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("=========================".green);
  console.log("   select an option");
  console.log("=========================".green);

  const { option } = await inquirer.prompt(question);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: "Press enter to continue...".green,
    },
  ];

  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate: (value) => {
        if (value.length === 0) {
          return "Please enter a description";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listDeleteTask = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}. `.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "delete",
      choices,
    },
  ];
  choices.push({
    value: "0",
    name: `${"0.".green} cancel`,
  });
  const { id } = await inquirer.prompt(question);
  return id;
};
const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListCheck = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}. `.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: (task.completeIn)?true:false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "selections",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTask,
  confirm,
  showListCheck,
};
