import { homedir } from 'os';
import { resolve } from 'path';
import { readdir } from 'fs/promises';

import { write } from './messages.mjs';
import { isDirectory, exist } from './utils.js';

const homeDir = homedir();
let currentDir = homeDir;

export const getHomeDir = () => homeDir;

export const getCurrentDir = () => {
  return currentDir;
};

export const getDirFiles = async () => {
  let files = null;
  try {
    files = await readdir(currentDir);
  } catch (e) {
    write(`Operation failed: Folder read error (${currentDir})!`, 2);
  }

  return files;
};

export const changePath = async (segment) => {
  if (!segment || segment.length === 0) {
    write('Invalid input: Path or folder name must be specify!', 2);

    return;
  }

  const newCurrentDir = resolve(currentDir, segment);

  if (!(await exist(newCurrentDir))) {
    write(`Invalid input: Folder not exist (${newCurrentDir})!`, 2);
    return;
  }

  if (!(await isDirectory(newCurrentDir))) {
    write(`Invalid input: It is not folder (${newCurrentDir})!`, 2);
    return;
  }

  if (newCurrentDir.startsWith(homeDir)) {
    currentDir = newCurrentDir;
  } else {
    currentDir = homeDir;
    write("Invalid input: You can't go above root folder", 2);
  }
};

export const goParentDir = async () => {
  await changePath('../');
};