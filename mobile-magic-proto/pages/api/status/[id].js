
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = Number(req.query.id);
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return res.status(404).json({ error: 'not found' });
  res.json(job);
}
