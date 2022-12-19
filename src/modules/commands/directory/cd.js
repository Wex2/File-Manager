import { changePath } from '../../shared/directoryChanger.js';

export const cd = async (dataString) => {
  await changePath(dataString);
};
