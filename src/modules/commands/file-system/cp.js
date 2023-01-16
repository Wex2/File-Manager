import { createWriteStream, createReadStream } from 'fs';
import { resolve, basename } from 'path';

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { exist, isDirectory } from '../../shared/utils.js';
import { write } from '../../shared/messages.mjs';

export const cp = async (dataString, needLogging = true) => {
  if (!dataString || dataString.split(" ").length !== 2) {
    needLogging &&
      write('Invalid input: Path/filename and pat to new directory must be specified!');
    needLogging &&
      write('FORMAT: [cp] [path_to_file] [path_to_new_directory]', 2);
    return false;
  }

  const currentDir = getCurrentDir();
  const [pathToFile, pathToNewDir] = dataString.split(" ");
  const pathFrom = resolve(currentDir, pathToFile);

  if (!(await exist(pathFrom))) {
    write(`Invalid input: File (${pathFrom}) does not exist!`, 2);
    return false;
  }
  if (await isDirectory(pathFrom)) {
    write(`Invalid input: It is not a file, it is a folder (${pathFrom})!`, 2);
    return false;
  }

  const fileName = basename(pathFrom);
  const dirTo = resolve(currentDir, pathToNewDir);

  if (!(await exist(dirTo))) {
    write(`Invalid input: The path (${dirTo}) does not exist!`, 2);
    return false;
  }
  if (!(await isDirectory(dirTo))) {
    write(`Invalid input: It is not a folder, it is a file (${dirTo})!`, 2);
    return false;
  }

  const pathTo = resolve(dirTo, fileName);

  if (await exist(pathTo)) {
    write(`Invalid input: File in this path (${pathTo}) already exists!`, 2);
    return false;
  }

  const readStream = createReadStream(pathFrom);

  try {
    const writeStream = createWriteStream(pathTo);
    readStream.pipe(writeStream);

    return new Promise((resolve) => {
      readStream.on('end', () => {
        needLogging && write('File copied!', 2);

        resolve(true);
      });
    });
  } catch {
    needLogging && write('Operation failed: File copy error!', 2);
  }
};
