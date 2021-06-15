const net = require('net');
const rl = require('readline').createInterface(process.stdin, process.stdout);

rl.setPrompt('MATH> ');
rl.prompt();

const options = {
    port: 5000  
};

let client = net.connect(options, () => {
    console.log("connected");
    doAritmeticOperation();
});

client.on("data", data => {
    console.log(data.toString());
    doAritmeticOperation();
});

client.on("end", data => {
    console.log("disconnected");
    rl.close();
});

doAritmeticOperation = () => {
    rl.on('line', (line) => {
        const input = line.trim().toLowerCase();
        client.write(input);
        rl.prompt();
    }).on('close', () =>{
        console.log("bye!!!");
        process.exit();
    });
}