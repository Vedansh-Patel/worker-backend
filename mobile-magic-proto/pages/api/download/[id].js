
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = Number(req.query.id);
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || !job.artifactPath) return res.status(404).json({ error: 'Artifact not found' });
  if (!fs.existsSync(job.artifactPath)) return res.status(404).json({ error: 'File missing' });
  res.setHeader('Content-Disposition', `attachment; filename="artifact_${id}.zip"`);
  res.send(fs.readFileSync(job.artifactPath));
}
