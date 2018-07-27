import { Callback, Context, Handler } from 'aws-lambda';

interface AWSResponse {
  body: string | object | any[];
  statusCode: number;
  isBase64Encoded?: boolean;
  headers?: { [header: string]: string };
}

export function wrap<Event = any, Returned = any>(
  fn: (event: Event, context: Context, callback: Callback) => Returned | Promise<Returned>
): Handler {
  return (event: Event, context: Context, callback: Callback) => {
    try {
      const returned = fn(event, context, callback);

      if (returned && returned instanceof Promise) {
        returned
          .then(result => {
            handleResult(result, callback);
          })
          .catch(error => {
            handleError(error, callback);
          });
      } else {
        handleResult(returned, callback);
      }
    } catch (error) {
      handleError(error, callback);
    }
  };
}

export function httpWrap<Event = any, Returned = AWSResponse>(
  fn: (event: Event, context: Context, callback: Callback) => Returned | Promise<Returned>
): Handler {
  return (event: Event, context: Context, callback: Callback) => {
    try {
      const returned = fn(event, context, callback);

      if (returned && returned instanceof Promise) {
        returned
          .then(result => {
            handleHttpResult(result, callback);
          })
          .catch(error => {
            handleError(error, callback);
          });
      } else {
        handleHttpResult(returned, callback);
      }
    } catch (error) {
      handleError(error, callback);
    }
  };
}

function handleResult(result: any, callback: Callback) {
  callback(null, result);
}

function handleHttpResult(lambdaResult: any, callback: Callback) {
  const { body, statusCode, isBase64Encoded, headers } = lambdaResult;
  callback(null, {
    statusCode,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    isBase64Encoded: isBase64Encoded || false,
    headers: headers || {}
  });
}

function handleError(error: any, callback: Callback) {
  console.error(error);
  callback(error);
}
