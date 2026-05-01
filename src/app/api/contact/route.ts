import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const adminTo = process.env.SMTP_ADMIN_TO || process.env.SMTP_USER;
  if (adminTo) {
    await sendEmail({
      to: adminTo,
      subject: `[Kontakt] ${parsed.data.name}`,
      html: `<p><strong>Von:</strong> ${escape(parsed.data.name)} (${escape(parsed.data.email)})</p>
<p style="white-space:pre-wrap">${escape(parsed.data.message)}</p>`,
    });
  }
  return NextResponse.json({ ok: true });
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
