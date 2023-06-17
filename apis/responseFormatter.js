function successOk(res, message = "Success", data) {
  return res.status(200).json({
    status: 200,
    message: message,
    data: data,
  });
}

function internalError(res, message = "Internal Server Error") {
  return res.status(503).json({
    status: 503,
    message: message,
  });
}

function badRequest(res, message = "") {
  return res.status(400).json({
    status: 400,
    message: message,
  });
}

module.exports = {
  successOk,
  internalError,
  badRequest,
};
