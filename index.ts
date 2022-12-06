import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
  await getAgents();
  console.log('finished');
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

type Agent = {
  id: number;
  displayName: string;
  project: number;
  sendbirdId: string;
  role: string;
  status: string;
};

type GetAgentsResponse = {
  count: any;
  next: any;
  previous: any;
  results: Agent[];
};

async function getAgents() {
  try {
    const { data, status } = await axios.get<any>(
      'https://desk-api-4B476FB9-DBF2-4500-8B2F-7D808A1FF6FF.sendbird.com/platform/v1/agents',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          SENDBIRDDESKAPITOKEN: '83dbf540314a3817fa9c12bb37d00b91404a2dbd'
        },
      },
    );

    console.log(data);

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}