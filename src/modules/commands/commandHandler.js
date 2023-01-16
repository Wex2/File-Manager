import { up } from './directory/up.js';
import { cd } from './directory/cd.js';
import { ls } from './directory/ls.js';
import { os } from './system/os.js'
import { cat } from './file-system/cat.js';
import { add } from './file-system/add.js';
import { rn } from './file-system/rn.js';
import { cp } from './file-system/cp.js';
import { mv } from './file-system/mv.js';
import { rm } from './file-system/rm.js';
import { calculateHash} from './file-system/calculateHash.mjs';
import { compress } from './file-system/compress.js';
import { decompress } from './file-system/decompress.js';
import { write } from '../shared/messages.mjs';

const commandExecutor = {
  up: up,
  cd: cd,
  ls: ls,
  cat: cat,
  add: add,
  rn: rn,
  cp: cp,
  mv: mv,
  rm: rm,
  hash: calculateHash,
  compress: compress,
  decompress: decompress,
  os: os,
};

export const handleLine = async (line) => {
  const lineData = line.split(' ');

  const command = lineData[0].trim();
  const executor = commandExecutor[command];

  let data = lineData[1] ? lineData.slice(1).join(' ') : '';

  if (executor) {
    await executor(data);
  } else {
    write(`Invalid input: Command "${command}" not found`, 2);
  }
};
