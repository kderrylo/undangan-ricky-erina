import { NextRequest, NextResponse } from 'next/server';
import { countAdmins, createAdmin } from '@/lib/admins';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

// ============================================================
// Endpoint ini HANYA untuk membuat admin pertama kali.
// Dilindungi oleh ADMIN_SETUP_TOKEN (env var) supaya tidak bisa
// dipakai sembarang orang untuk membuat akun admin baru.
//
// Setelah admin pertama berhasil dibuat, endpoint ini otomatis
// menolak permintaan berikutnya (lihat pengecekan countAdmins()).
//
// Contoh pemakaian (lihat README-ADMIN.md untuk detail lengkap):
//   curl -X POST https://domainmu.com/api/admin/setup \
//     -H "Content-Type: application/json" \
//     -d '{"token":"<ADMIN_SETUP_TOKEN>","username":"admin","password":"passwordkuat","name":"Ricky & Erina"}'
// ============================================================

export async function POST(req: NextRequest) {
  const setupToken = process.env.ADMIN_SETUP_TOKEN;
  if (!setupToken) {
    return NextResponse.json(
      { error: 'ADMIN_SETUP_TOKEN belum diatur di server.' },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.token || body.token !== setupToken) {
    return NextResponse.json({ error: 'Token setup tidak valid.' }, { status: 401 });
  }

  if (!body.username || !body.password || !body.name) {
    return NextResponse.json(
      { error: 'username, password, dan name wajib diisi.' },
      { status: 400 }
    );
  }

  if (String(body.password).length < 8) {
    return NextResponse.json(
      { error: 'Password minimal 8 karakter.' },
      { status: 400 }
    );
  }

  try {
    const existing = await countAdmins();
    if (existing > 0) {
      return NextResponse.json(
        { error: 'Admin sudah pernah dibuat. Endpoint ini hanya untuk setup pertama kali.' },
        { status: 409 }
      );
    }

    const admin = await createAdmin({
      username: String(body.username).trim(),
      password: String(body.password),
      name: String(body.name).trim(),
    });

    return NextResponse.json({ data: admin }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
