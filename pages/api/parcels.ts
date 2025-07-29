import type { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { legaldesc } = req.query;
  if (!legaldesc || Array.isArray(legaldesc)) {
    res.status(400).json({ error: 'Missing legaldesc query parameter' });
    return;
  }

  try {
    const command = new QueryCommand({
      TableName: 'Parcels',
      IndexName: 'legaldesc-index',
      KeyConditionExpression: 'legaldesc = :desc',
      ExpressionAttributeValues: { ':desc': legaldesc },
    });

    const result = await client.send(command);
    res.status(200).json({ items: result.Items ?? [] });
  } catch (error) {
    console.error('DynamoDB query error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
