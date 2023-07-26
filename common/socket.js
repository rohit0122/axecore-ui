// socket.js
import { Server } from "socket.io";
import { debugIt } from "./constants";
export default function socketHandler(req, res) {

    if (!res.socket.server.io) {
        // Create a new Socket.io server if one doesn't already exist
        const io = new Server(res.socket.server, { cors: { origin: '*' } });
        io.listen(3200);
        // Attach the Socket.io server to the response object
        res.socket.server.io = io;
        debugIt && console.log('working on');
        // Event handler for socket connections
        //io.sockets.on('connection', function (socket) {
            io.on('connection', function (socket) {
            socket.on('disconnect', () => {
                debugIt && console.log(`Socket ${socket.id} disconnected.`);
                socket.leave('user1@example.com');
                socket.disconnect();
            });

            socket.on('join', function (data) {
                debugIt && console.log('data join===========> ',data.email, socket.listenerCount.length);
                socket.join(data.email); // We are using room of socket io
            });
            socket.on('initialMsg', (text) => {
                debugIt && console.log("initialMsg: ", text);
                io.to('user1@example.com').emit('initialMsgToFront', text);

            });
            socket.on('errorMsg', (text) => {
                debugIt && console.log("errorMsg: ", text);
                io.to('user1@example.com').emit('errorMsgToFront', text);

            });
            socket.on('infoWarningMsg', (text) => {
                debugIt && console.log("infoWarningMsg: ", text);
                io.to('user1@example.com').emit('infoWarningMsgToFront', text);

            });
            /*socket.on('executingUrlMsg', (text) => {
                debugIt && console.log("executingUrlMsg: ", text);
                io.to('user1@example.com').emit('executingUrlMsgToFront', text);

            });
            socket.on('a11yReportMsg', (text) => {
                debugIt && console.log("a11yReportMsg: ", text);
                io.to('user1@example.com').emit('a11yReportMsgToFront', text);

            });
            socket.on('a11yScoreMsg', (text) => {
                debugIt && console.log("a11yScoreMsg: ", text);
                io.to('user1@example.com').emit('a11yScoreMsgToFront', text);

            });
            socket.on('a11yIssueMsg', (text) => {
                debugIt && console.log("a11yIssueMsg: ", text);
                io.to('user1@example.com').emit('a11yIssueMsgToFront', text);

            });
            socket.on('a11ySuccessMsg', (text) => {
                debugIt && console.log("a11ySuccessMsg: ", text);
                io.to('user1@example.com').emit('a11ySuccessMsgToFront', text);

            });*/
            socket.on('a11yCsvReportMsg', (text) => {
                debugIt && console.log("a11yCsvReportMsg: ", text);
                io.to('user1@example.com').emit('a11yCsvReportMsgToFront', text);

            });

            socket.on('a11yRowResults', data => {
                debugIt && console.log("a11yRowResults: ", data);
                io.to('user1@example.com').emit('a11yRowResultsToFront', data);
            });

        });
    }

    res.end();
}
