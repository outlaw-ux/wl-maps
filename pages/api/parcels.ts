import type { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getLegalDescRegex } from '../../utils/getLegalDescRegex';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  const { lot, block, section } = query;

  if (method === 'GET') {
    if (
      !lot ||
      !block ||
      !section ||
      Array.isArray(lot) ||
      Array.isArray(block) ||
      Array.isArray(section)
    ) {
      res
        .status(400)
        .json({ error: 'Missing lot, block, or section parameter' });

      const regex = getLegalDescRegex(
        lot.toString(),
        block.toString(),
        section.toString()
      );

      try {
        const command = new ScanCommand({
          TableName: 'Parcels',
          IndexName: 'legaldesc-index',
        });

        const result = await client.send(command);
        const items = (result.Items ?? []).filter(
          (item) =>
            typeof item.legaldesc === 'string' && regex?.test(item.legaldesc)
        );
        res.status(200).json({ items });
        res.status(200).json({ items: result.Items ?? [] });
      } catch (error) {
        console.error('DynamoDB query error', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
