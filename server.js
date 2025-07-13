const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//générer un ID auto-incrémenté pour les cours
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/courses') {
    const courses = router.db.get('courses').value();
    const maxId = courses.length > 0
      ? Math.max(...courses.map(c => Number(c.id)))
      : 0;
    req.body.id = maxId + 1;
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
