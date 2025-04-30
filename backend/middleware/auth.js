const users = require('../routes/auth').users; // Access in-memory user store

const authMiddleware = (req, res, next) => {
  const userId = req.cookies.sessionId; // Simulated session cookie
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: No session found' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }

  req.user = user; // Attach user to request
  next();
};

module.exports = authMiddleware;