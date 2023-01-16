import { cp } from './cp.js';
import { rm } from './rm.js';
import { write } from '../../shared/messages.mjs';

export const mv = async (dataString) => {
  if (!dataString || dataString.split(" ").length !== 2) {
    write('Invalid input: Path/filename and path to new directory must be specified!');
    write('FORMAT: [mv] [path_to_file] [path_to_new_directory]', 2);
    return;
  }

  try {
    const copySuccess = await cp(dataString, false);
    if (!copySuccess) {
      return;
    }

    const removeSuccess = await rm(dataString.split(' ')[0], false);
    if (!removeSuccess) {
      return;
    }

    write('File moved', 2);
  } catch {
    write('Operation failed: File move error!', 2);
  }
};
