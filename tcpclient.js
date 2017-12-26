var net = require('net'),
    client = new net.Socket();

client.connect(5051, '46.101.54.243', function () {
    console.log('Connected to: localhost:3000');
    client.write('!D,16:11:17,08:15:05,24.55,1.56,desd,160000,0,60,60,0,0');
    // client.write('!1,24345');

});

client.on('data', function(data) {
    console.log('Data:', data.toString());
    // client.destroy();
});

client.on('close', function () {
    console.log('Connection closed');
});