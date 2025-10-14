import { NextRequest, NextResponse } from 'next/server';

import { deleteObsoleteTournaments } from '@/app/api/clean-and-revalidate/deleteObsoleteTournaments';
import { rollbarServer } from '@/rollbar/server';

export async function GET(request: NextRequest) {
  rollbarServer.info('clean-and-revalidate: Start');

  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    rollbarServer.warning('clean-and-revalidate: Unauthorized request.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  rollbarServer.info('clean-and-revalidate: Cleaning and revalidating tournaments');

  await deleteObsoleteTournaments();

  rollbarServer.info('clean-and-revalidate: Clean tournaments done. Gonna revalidate cache.');

  rollbarServer.info('clean-and-revalidate: Done');

  return NextResponse.json({ ok: true });
}
