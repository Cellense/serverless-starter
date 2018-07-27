import { httpWrap } from '@helpers';
import { APIGatewayEvent } from 'aws-lambda';

export default httpWrap<APIGatewayEvent>(async () => {
  return {
    statusCode: 200,
    body: { data: 'Hello' }
  };
});
