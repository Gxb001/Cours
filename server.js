module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/courses') {
    req.body.id = Date.now();
  }
  next();
};
