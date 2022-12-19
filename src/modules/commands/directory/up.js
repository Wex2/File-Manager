import { goParentDir } from '../../shared/directoryChanger.js';

export const up = async () => {
  await goParentDir();
};
