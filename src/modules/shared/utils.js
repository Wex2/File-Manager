import { access, stat } from 'fs/promises';

export const exist = async (path) => {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
};

export const isDirectory = async (current) => {
  try {
    const stats = await stat(current);

    return stats.isDirectory();
  } catch {
    return false;
  }
};

const filNameRegExp = new RegExp('[/\\\\:?"<>|]+');

export const checkFileName = (name) => filNameRegExp.test(name);
