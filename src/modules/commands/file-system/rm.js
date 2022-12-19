import { unlink } from 'fs/promises';
import { resolve } from 'path';

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { write } from '../../shared/messages.mjs';
import { exist, isDirectory } from "../../shared/utils.js";

export const rm = async (dataString, needLogging = true) => {
  if (!dataString) {
    needLogging && write('Invalid input: Path/filename must be specified!');
    needLogging && write('FORMAT: [rm] [path_to_file]', 2);
    return false;
  }

  const currentDir = getCurrentDir();
  const pathToFile = resolve(currentDir, dataString);

  if (!(await exist(pathToFile))) {
    write(`Invalid input: File (${pathToFile}) does not exist!`, 2);
    return false;
  }

  if (await isDirectory(pathToFile)) {
    write(`Invalid input: It is not a file, it is a folder (${pathToFile})!`, 2);
    return false;
  }

  try {
    await unlink(pathToFile);
    needLogging && write('File deleted', 2);

    return true;
  } catch {
    needLogging && write('Operation failed: File deletion error!', 2);

    return false;
  }
};
