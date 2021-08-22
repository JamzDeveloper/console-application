require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log("=========================".green);
    console.log("   select an option");
    console.log("=========================".green);

    console.log(`${"1.".green} create task`);
    console.log(`${"2.".green} show all tasks`);
    console.log(`${"3.".green} show all completed tasks`);
    console.log(`${"4.".green} show all pending tasks`);
    console.log(`${"5.".green} complete task`);
    console.log(`${"6.".green} delete task`);
    console.log(`${"0.".green} exit\n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question("select an option: ", (option) => {
      readLine.close();
      resolve(option);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question(`press enter to continue`.green, (option) => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
