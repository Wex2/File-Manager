import { unlink } from 'fs/promises';
import { resolve } from 'path';
import { createWriteStream, createReadStream } from 'fs';

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { exist, isDirectory, checkFileName } from '../../shared/utils.js';
import { write } from '../../shared/messages.mjs';

export const rn = async (dataString) => {
  if (!dataString || dataString.split(" ").length !== 2) {
    write('Invalid input: Path/filename and new filename must be specified!');
    write('FORMAT: [rn] [path_to_file] [new_filename]', 2);
    return;
  }

  const currentDir = getCurrentDir();
  const [pathToFile, newFileName] = dataString.split(" ");

  if (checkFileName(newFileName)) {
    write('Invalid input: Name must not contain characters /\\:?"<>| ');
    return;
  }

  const fullPathToFile = resolve(currentDir, pathToFile);

  if (!(await exist(fullPathToFile))) {
    write(`Invalid input: File (${fullPathToFile}) does not exist!`, 2);
    return;
  }

  if (await isDirectory(fullPathToFile)) {
    write(`Invalid input: It is not a file, it is a folder (${fullPathToFile})!`, 2);
    return;
  }
  const renamedFullPathToFile = resolve(fullPathToFile, '../', newFileName);

  if (await exist(renamedFullPathToFile)) {
    write(`Invalid input: File with this name (${newFileName}) already exists!`, 2);
    return;
  }

  try {
    const readStream = createReadStream(fullPathToFile);
    const writeStream = createWriteStream(renamedFullPathToFile);
    readStream.pipe(writeStream);

    return new Promise((resolve) => {
      readStream.on('end', async () => {
        await unlink(fullPathToFile);
        write('File renamed');

        resolve();
      });
    });
  } catch {
    write('Operation failed: File renaming error!', 2);
  }
};
