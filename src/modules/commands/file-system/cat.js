import { resolve } from 'path';
import { createReadStream } from 'fs';

import { getCurrentDir } from '../../shared/directoryChanger.js';
import { write } from '../../shared/messages.mjs';
import { exist, isDirectory } from '../../shared/utils.js';

export const cat = async (dataString) => {
  if (!dataString || dataString.split(" ").length > 1) {
    write('Invalid input: Path/filename must be specified!');
    write('FORMAT: [cat] [path_to_file]', 2);
    return;
  }

  const currentDir = getCurrentDir();
  const pathToFile = resolve(currentDir, dataString);

  if (!(await exist(pathToFile))) {
    write(`Invalid input: File (${pathToFile}) does not exist!`, 2);
    return;
  }
  if (await isDirectory(pathToFile)) {
    write(`Invalid input: It is not a file, it is a folder (${pathToFile})!`, 2);
    return;
  }

  try {
    const readStream = createReadStream(pathToFile);

    write('File content:', 1);
    readStream.on('data', (data) => {
      write(data.toString());
    });

    return new Promise((resolve) => {
      readStream.on('end', () => {
        write('');

        resolve();
      });
    });
  } catch {
    write('Operation failed: File read error!', 2);
  }
};
