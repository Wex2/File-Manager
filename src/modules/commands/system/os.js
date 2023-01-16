import { write } from '../../shared/messages.mjs';
import {
  executorEOL,
  executorArchitecture,
  executorCpus,
  executorHomeDir,
  executorUserName,
} from './executors.js';

const executors = {
  '--EOL': executorEOL,
  '--cpus': executorCpus,
  '--homedir': executorHomeDir,
  '--username': executorUserName,
  '--architecture': executorArchitecture,
};

export const os = (dataString) => {
  if (!dataString || !dataString.startsWith('--')) {
    write('Invalid input: Unknown command arguments!');
    write('FORMAT: [os] [--command]', 2);
    return;
  }

  const executor = executors[dataString];

  if (executor) {
    executor();
  } else {
    write(`Invalid input: Unknown command arguments (${dataString}) for 'os'!`);
  }
};
