const employeeAuth = (req, res, next) => {
    if (req.user.role !== 'employee' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied. Employee or Admin only.' });
    }
    next();
  };
  
  module.exports = employeeAuth;
  