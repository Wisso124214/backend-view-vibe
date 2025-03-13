export const config = {
  DB_URL: 'mongodb+srv://Usuario11:user11@cluster01.rbzr4.mongodb.net/viewVibe?retryWrites=true&w=majority&appName=Cluster01',
  PORT: process.env.PORT || 3000,
  SERVER_IP: '192.168.0.108',
  PROTOCOL: 'http',
}

export const SERVER_URL = `${config.PROTOCOL}://${config.SERVER_IP}:${config.PORT}`;
