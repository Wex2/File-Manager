import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { write } from '../../shared/messages.mjs'

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { exist, checkFileName } from '../../shared/utils.js';

export const add = async (dataString) => {
  if (!dataString || dataString.split(" ").length > 1) {
    write('Invalid input: Filename must be specified!');
    write('FORMAT: [add] [new_file_name]', 2);
    return;
  }
  if (checkFileName(dataString)) {
    write('Invalid input: Name must not contain characters /\\:?"<>| ');
    return;
  }

  const currentDir = getCurrentDir();
  const pathToFile = resolve(currentDir, dataString);

  if (await exist(pathToFile)) {
    write(`Invalid input: File (${pathToFile}) already exists!`, 2);
    return;
  }

  try {
    createWriteStream(pathToFile);

    write('File created');
  } catch {
    write('Operation failed: File creation error!', 2);
  }
};
