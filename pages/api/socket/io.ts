import { NextApiResponseServerIo } from "@/lib/types";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      // Listen for incoming messages and broadcast to all clients
      socket.on('message', (message) => {
          io.emit('message', message);
      });

      // Clean up the socket on disconnect
      socket.on('disconnect', () => {
          console.log(`Socket ${socket.id} disconnected.`);
      });
  });
    
    res.socket.server.io = io;
  }

  res.end();
}

export default ioHandler;