// 404 handler
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

// Central error handler
export const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const _next = next;

  // Always log server errors (useful for Render logs)
  // eslint-disable-next-line no-console
  console.error(err);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Server Error";

  // Mongoose invalid ObjectId / cast error
  if (err?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Mongoose duplicate key
  if (err?.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field} already exists`;
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "production" ? {} : { stack: err.stack }),
  });
};
