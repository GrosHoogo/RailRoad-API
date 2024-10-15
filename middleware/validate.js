const validate = (schema) => {
  return (req, res, next) => {
    if (!schema) {
      console.warn('No schema provided for validation');
      return next();
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = validate;
