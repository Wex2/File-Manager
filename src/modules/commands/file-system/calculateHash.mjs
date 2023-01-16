import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";

import { getCurrentDir } from "../../shared/directoryChanger.js";
import { exist, isDirectory } from "../../shared/utils.js";
import { write } from '../../shared/messages.mjs';

export const calculateHash = async (commandData) => {
  if (!commandData || commandData.split(" ").length > 1) {
    write('Invalid input: Path/filename must be specified!');
    write('FORMAT: [hash] [path_to_file]', 2);
    return;
  }

  const currentDir = getCurrentDir();
  const pathToFile = resolve(currentDir, commandData);

  if (!(await exist(pathToFile))) {
    write(`Invalid input: File (${pathToFile}) does not exist!`, 2);
    return;
  }

  if (await isDirectory(pathToFile)) {
    write(
      `Invalid input: It is not a file, it is a folder (${pathToFile})!`,
      2
    );
    return;
  }

  try {
    const readStream = createReadStream(pathToFile);
    const hash = createHash('sha256').setEncoding('hex');
    readStream.pipe(hash);

    return new Promise((resolve) => {
      readStream.on('end', () => {
        write(`FILE HASH: ${hash.read()}`, 2);
        resolve();
      });
    });
  } catch {
    write('Operation failed: File hash error!', 2);
  }
};
