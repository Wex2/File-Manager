import { basename, extname, resolve } from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { createBrotliCompress } from 'zlib';

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { exist, isDirectory } from '../../shared/utils.js';
import { write } from '../../shared/messages.mjs';

const gzExt = '.br';

export const compress = async (commandData) => {
  if (!commandData || commandData.split(' ').length !== 2) {
    write('Invalid input: Path/filename and destination must be specified!');
    write('FORMAT: [compress] [path_to_file] [path_to_destination]', 2);
    return;
  }

  const currentDir = getCurrentDir();
  const [pathToFile, pathToDestination] = commandData.split(" ");
  const fullPathToFile = resolve(currentDir, pathToFile);

  if (!(await exist(fullPathToFile))) {
    write(`Invalid input: File (${fullPathToFile}) does not exist!`, 2);
    return;
  }
  if (await isDirectory(fullPathToFile)) {
    write(`Invalid input: It is not a file, it is a folder (${fullPathToFile})!`, 2);
    return;
  }

  const fileName = basename(fullPathToFile);
  const directoryPathToDestination = resolve(currentDir, pathToDestination);

  if (!(await exist(directoryPathToDestination))) {
    write(`Invalid input: The path (${directoryPathToDestination}) not exists!`, 2);
    return;
  }
  if (!(await isDirectory(directoryPathToDestination))) {
    write(`Invalid input: It is not a folder, it is a file (${directoryPathToDestination})!`, 2);
    return;
  }

  const ext = extname(fileName);
  const reg = new RegExp(`(${ext}{1})$`);
  const fullPathToDestination = resolve(
    directoryPathToDestination,
    fileName.replace(reg, gzExt)
  );

  if (await exist(fullPathToDestination)) {
    write(`Invalid input: File in this path (${fullPathToDestination}) already exists!`, 2);
    return;
  }

  const readStream = createReadStream(fullPathToFile);
  const writeStream = createWriteStream(fullPathToDestination);
  const gzip = createBrotliCompress();

  readStream.pipe(gzip).pipe(writeStream);

  return new Promise((resolve) => {
    gzip.on('end', () => {
      write(`File compressed`, 2);

      resolve();
    });
  });
};
