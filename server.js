const net = require('net')

let server = net.createServer(connection => {
    console.log("new connection");

    connection.on("data", data => {
        console.log(data.toString());

        if(data === undefined || data == null) return;

        var numbers = data.toString().split(",");
        
        if(isEmptyOrNull(numbers)){
            connection.write("Error no data");
            return;
        }

        var operation = numbers[0].toLowerCase();
        switch(operation){
            case "add":
                numbers.shift();
                connection.write(`Result: ${numbers.reduce(sumReducer)}`);
                break;
            case "sub":
                numbers.shift();
                connection.write(`Result: ${numbers.reduce(subReducer)}`);
                break;
            default:
                connection.write(`No operation found: ${operation}`);
                break;
        }
    })
})

const isEmptyOrNull = (numbers)=> {
    return numbers?.length === 0;
}

const sumReducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
const subReducer = (accumulator, currentValue) => parseInt(accumulator) - parseInt(currentValue);

server.listen(5000, () => {
    console.log("Waiting connection");
})