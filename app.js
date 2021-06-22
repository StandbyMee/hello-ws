//导入WebSocket模块
const WebSocket = require('ws');
//引用Server类
const WebSocketServer = WebSocket.Server;
//实例化
const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});
console.log('ws server started at port 3000...');

//client test:

let count = 0;

let ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.on('open', function() {
    console.log('[CLIENT] open()');
    ws.send('Hello!');
});

//相应收到的信息
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
    count++;
    if (count > 3) {
        ws.send('Goodbye!');
        ws.close();
    } else {
        setTimeout(() => {
            ws.send(`Hello, I'm Mr No.${count}!`);
        }, 1000);
    }
});


// let ws = new WebSocket('ws://localhost:3000/test');

// // 打开WebSocket连接后立刻发送一条消息:
// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });

// // 响应收到的消息:
// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
// })