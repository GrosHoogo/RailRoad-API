const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied. Admin only.' });
    }
    next();
  };
  
  module.exports = adminAuth;
  