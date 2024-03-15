import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: Request) {

  const currentUser = await initialProfile();

  if (currentUser.role !== "CLIENT"){
    return new Response('You dont have the necessary permissions', { status: 404 });
  }

  const body = await request.json();
  const { startDate, endDate, projectId } = body;

  const audits = db.audit.findMany({
    where: {
      projectId: projectId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    }
  })

  return new Response(JSON.stringify(audits), { status: 200, headers: { 'Content-Type': 'application/json' } })
}