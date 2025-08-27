
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const queue = new Queue('jobs', { connection: redis });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { idea, platform } = req.body;
  if (!idea) return res.status(400).json({ error: 'idea required' });

  const job = await prisma.job.create({
    data: { idea, platform: platform || 'web', status: 'pending' }
  });

  await queue.add('generate', { jobId: job.id });

  res.json({ id: job.id });
}
