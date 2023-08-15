import jsonServer from 'json-server'
const server = jsonServer.create();
import cors from 'cors'

// Sử dụng middleware CORS
server.use(cors());

// Cấu hình tệp db.json và routes tại đây
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});