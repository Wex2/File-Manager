import { arch, cpus, EOL, userInfo } from 'os';
import { getHomeDir } from '../../shared/directoryChanger.js';
import { write } from '../../shared/messages.mjs';

const divider = 1000;

const mathFreq = (speed) => Math.round((speed * 100) / divider) / 100;

export const executorEOL = () => {
  const EOLAsStr = JSON.stringify(EOL).replace(/^.|.$/g, "");

  write(`EOL: ${EOLAsStr}`, 2);
};

export const executorCpus = () => {
  const cpusInfo = cpus();
  const cpusCount = cpusInfo.length;

  write(`CPU count: ${cpusCount}`);

  const logCpuInfo = (cpu, index) => {
    const cpuInfoAsStr = `CPU-${index + 1}: ${mathFreq(cpu.speed)} GHz`;

    write(cpuInfoAsStr, index === cpusCount - 1 ? 2 : 1);
  };

  cpusInfo.forEach(logCpuInfo);
};

export const executorHomeDir = () => {
  write(`HOMEDIR: ${getHomeDir()}`, 2);
};

export const executorUserName = () => {
  write(`USERNAME: ${userInfo().username}`, 2);
};

export const executorArchitecture = () => {
  write(`ARCHITECTURE: ${arch()}`, 2);
};
