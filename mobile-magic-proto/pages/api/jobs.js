
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } });
  const out = jobs.map(j => ({
    id: j.id, idea: j.idea, status: j.status, artifactPath: j.artifactPath,
    downloadUrl: j.artifactPath ? `/api/download/${j.id}` : null
  }));
  res.json(out);
}
