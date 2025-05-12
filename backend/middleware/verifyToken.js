import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1]; // Adjust based on your auth setup

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Assuming your JWT payload has userId
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};