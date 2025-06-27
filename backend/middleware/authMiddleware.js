const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.type === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.type === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Access denied" });
    }
  };
};

module.exports = {
  authMiddleware,
  verifyAdmin,
  requireRole,
};
