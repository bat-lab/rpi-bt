const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sendText = (value = '', handler) => {
  console.log('send to bluetooh:', value);
  handler(value);
};

// TODO: implement routine to test valid input value
const isValidInput = (value = '') => value !== '' && value !== ' ';

const isExitCommand = (value = '') =>
  value.toLowerCase().indexOf('exit') === 0 || value.toLowerCase().indexOf('bye') === 0;

const InputHandler = (value = '', handler, closeHandler) => {
  if (isExitCommand(value)) {
    closeHandler();
    return;
  }

  if (false === isValidInput(value)) {
    console.log('just wait for another value if value not valid');
    return;
  }

  sendText(value, handler);
};

const close_handler = (rl, btCloseHandler) => () => {
  rl.close();
  btCloseHandler && btCloseHandler();
};

const initReadModule = (handler, btCloseHandler) => {
  rl.on('line', input => {
    InputHandler(input, handler, close_handler(rl, btCloseHandler));
  });

  rl.on('resume', () => {
    console.log('Close Roboter Comtrol');
  });

  rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? ', answer => {
      if (answer.match(/^y(es)?$/i)) {
        close_handler(rl, btCloseHandler)();
      }
    });
  });
};

module.exports = initReadModule;
