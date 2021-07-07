const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(process.env.PORT || 8000, () => {
  console.log("json server runs on http://localhost:8000");
});
