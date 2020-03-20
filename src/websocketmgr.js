"use strict";

var WebSocketUser = require(__dirname + "/websocketuser");
var WebSocketServer = require("ws").Server;
var config = require(__dirname + "/config");

/**
 * Some tools for web socket server management
 */
var WebSocketMgr = {};

/**
 * The socket server itself
 * @type {null|WebSocketServer}
 */
WebSocketMgr.server = null;

/**
 * Start the websocket server
 */
module.exports = function(app) {
    try {
        if (WebSocketMgr.server === null) {
            WebSocketMgr.server = new WebSocketServer({server: app});
            WebSocketMgr.server.on('connection', function connection(ws) {
                var user = new WebSocketUser(ws);
                ws.on('message', function incoming(message) {
                    try {
                        user.onMessage(JSON.parse(message));
                    } catch (e) {
                        console.error(new Date(), e.stack);
                    }
                });
                ws.on("close", function () {
                    try {
                        user.onMessage({"action": "closed"});
                    } catch (e) {
                        console.error(new Date(), e.stack);
                    }
                });
            });
            // if for some reason the server went down, restart it some seconds later
            WebSocketMgr.server.on('close', function close() {
                WebSocketMgr.server = null;
                WebSocketUser.instances = [];
            });
        }
    } catch (e) {
        console.error(new Date(), "Start Websocket Server error", e);
    }
};
