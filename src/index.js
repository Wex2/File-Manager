import { getArgs } from './modules/shared/args.js';
import { handleLine } from './modules/commands/commandHandler.js';
import { getCurrentDir } from './modules/shared/directoryChanger.js';
import { write } from './modules/shared/messages.mjs';
import { createInterface } from 'readline';


const argsData = getArgs();
console.clear();

if (!argsData.username) {
  write('Invalid input: You must enter username!');
  write('USE: npm run start -- --username=[user]');
  process.exit();
}
const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});


const logDefaultMessage = () => {
  write(`You are currently in ${getCurrentDir()}`, 2);
};

const processLine = (line) => {
  return line
    .toString()
    .replace(new RegExp("\\r?\\n", "g"), "")
    .split(' ')
    .filter((w) => w.length !== 0)
    .join(' ');
};

write(`Welcome to the File Manager, ${argsData.username}!`, 2);
logDefaultMessage();

const exit = () => {
  write(`\nThank you for using File Manager, ${argsData.username}!`)
  process.exit(0)
}

readLine.on('line', async (data) => {
  const line = processLine(data);
  if (line === '.exit') {
    exit();
  }

  await handleLine(line);

  logDefaultMessage();
});

readLine.once('SIGINT', exit);

readLine.once('exit', exit);
