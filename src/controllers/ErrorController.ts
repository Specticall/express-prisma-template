import { AppError } from "../utils/http/AppError";
import { ErrorRequestHandler } from "express";

/**
 * Maps error message to other error messages
 */
const errorMap = {
  "jwt expired": "Token has expired",
};

const specifyError = (error: Error) => {
  return (
    errorMap[(error.message || "") as keyof typeof errorMap] ||
    "Something went very wrong!"
  );
};

/**
 * Error Handler that runs on development mode (npm run dev)
 */
const developmentErrorHandler: ErrorRequestHandler = async (
  error: AppError | Error,
  request,
  response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).send({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  response.status(500).send({
    status: "fail",
    statusCode: 500,
    message: specifyError(error),
    stack: error.stack,
  });
};

/**
 * Error Handler that runs on production mode (npm run prod)
 */
const productionErrorHandler: ErrorRequestHandler = async (
  error: AppError | Error,
  request,
  response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).send({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });

    return;
  }

  response.status(500).send({
    status: "fail",
    statusCode: 500,
    message: specifyError(error),
  });
};

export default process.env.ENVIROMENT === "prod"
  ? productionErrorHandler
  : developmentErrorHandler;
