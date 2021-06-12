const handleError = (err, req, res, next) =>
  res.status(500).send({ message: err.message });

const handleQueryError = (err, req, res, next) =>
  res.status(422).send({
    message: err.message,
  });

const handleValidationError = (err, req, res, next) =>
  res.status(422).send({
    message: err.message,
  });

module.exports = { handleError, handleQueryError, handleValidationError };
