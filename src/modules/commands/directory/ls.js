import { getCurrentDir } from '../../shared/directoryChanger.js';
import { readdir } from 'fs/promises';

export const ls = async () => {
  const list = await readdir(getCurrentDir(), {withFileTypes: true});

  if (list.length === 0) {
    return console.log('Folder is empty');
  }

  list.sort((a, b) => a.name.localeCompare(b.name));

  const directories = list
      .filter(item => item.isDirectory())
      .map(({name}) => ({Name: name, Type: 'directory'}));

  const files = list
      .filter(item => item.isFile())
      .map(({name}) => ({Name: name, Type: 'file'}));

  console.table([...directories, ...files])
};
