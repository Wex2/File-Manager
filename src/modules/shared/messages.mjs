export const write = ( msg, newLine = 1, space = 0) => {
  const { stdout } = process;

  stdout.write(
    `${' '.repeat(space)}${msg}${'\n'.repeat(newLine)}`
  );
};
