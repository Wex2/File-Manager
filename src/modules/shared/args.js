const argReg = new RegExp('^--(.+)$');

const args = process.argv.slice(2);

const argsObj = {};

for (let i = 0; i < args.length; i++) {
  const matches = args[i].match(argReg);

  const arg = matches ? matches[1] : null;

  if (arg) {
    const [key, value] = arg.split('=');
    argsObj[key] = value;
  }
}

export const getArgs = () => argsObj;
