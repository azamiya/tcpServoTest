var server = require("./server.js");
server.init();

/*
    johnny-five [ Arduino Setting ]
*/
var five = require("johnny-five");
var board = new five.Board();
var servo1;
var servo2;

board.on("ready", function() {
    // デジタル10番ピンを設定
    servo1 = new five.Servo(10);
    // デジタル11番ピンを設定
    servo2 = new five.Servo(11);
});

/*
    Socket.IO
*/
// サーバーへのアクセスを監視。アクセスがあったらコールバックが実行
server.io.sockets.on("connection", function (s) {
    var socket = s;

    // クライアントからのデータの受信
    socket.on("servo", function(dataFromClient) {
        // サーボモーターを目的の角度まで回転
        if(servo1) servo1.to(Number(dataFromClient.angleX));
        if(servo2) servo2.to(Number(dataFromClient.angleY));
    });
});