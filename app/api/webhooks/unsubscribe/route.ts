import { Pool } from "pg";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

let dataPool: Pool | undefined;
let mainPool: Pool | undefined;

function getDataDb(): Pool {
  if (dataPool) return dataPool;
  const connectionString = getEnv("SUPABASE_URL_DATA");
  if (!connectionString) throw new Error("Missing SUPABASE_URL_DATA Postgres connection string");
  dataPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return dataPool;
}

function getMainDb(): Pool {
  if (mainPool) return mainPool;
  const connectionString = getEnv("SUPABASE_URL");
  if (!connectionString) throw new Error("Missing SUPABASE_URL Postgres connection string");
  mainPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return mainPool;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function findUserIdByEmail(email: string): Promise<string | undefined> {
  const db = getDataDb();
  const result = await db.query(
    `select id from public.users where lower(email) = lower($1) limit 1`,
    [email]
  );
  return result.rows?.[0]?.id as string | undefined;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || undefined;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), { status: 400 });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    }

    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return new Response(JSON.stringify({ error: "User not found for given email" }), { status: 404 });
    }

    const mainDb = getMainDb();
    const res = await mainDb.query(
      `select out_from_marketing, out_from_update from public.users where id = $1`,
      [userId]
    );
    const row = res.rows?.[0] || {};

    return new Response(
      JSON.stringify({
        out_from_marketing: row.out_from_marketing || null,
        out_from_update: row.out_from_update || null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email;
    // Accept either unsubscribe_* or out_from_* booleans
    const unsubscribeMarketing: boolean = Boolean(
      body?.unsubscribe_marketing ?? body?.out_from_marketing
    );
    const unsubscribeUpdates: boolean = Boolean(
      body?.unsubscribe_updates ?? body?.out_from_updates
    );

    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), { status: 400 });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    }

    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return new Response(JSON.stringify({ error: "User not found for given email" }), { status: 404 });
    }

    const mainDb = getMainDb();
    const result = await mainDb.query(
      `update public.users
         set out_from_marketing = case when $2 then now() else null end,
             out_from_update    = case when $3 then now() else null end
       where id = $1
       returning out_from_marketing, out_from_update`,
      [userId, unsubscribeMarketing, unsubscribeUpdates]
    );

    const row = result.rows?.[0] || {};
    return new Response(
      JSON.stringify({
        success: true,
        email,
        out_from_marketing: row.out_from_marketing || null,
        out_from_update: row.out_from_update || null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}


