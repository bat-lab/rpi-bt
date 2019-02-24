const bluetooth = require('node-bluetooth');
const readModule = require('./readline.js');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

const address = '98-D3-61-F9-3B-0D';
device.findSerialPortChannel(address, channel => {
  console.log('Connection Start on %s: ', channel);
  bluetooth.connect(
    address,
    channel,
    function(err, connection) {
      if (err) return console.error(err);

      readModule(
        value => {
          connection.write(new Buffer(value, 'utf-8'), () => {
            console.log('successfully wrote');
          });
        },
        () => connection.close()
      );

      connection.on('data', buffer => {
        console.log('received message:', buffer.toString());
      });
    }
  );
});
