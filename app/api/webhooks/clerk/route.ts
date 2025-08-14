import { createClient } from "@supabase/supabase-js";

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserCreated = {
  type: string;
  data: {
    id: string;
    created_at: number | string;
    first_name?: string | null;
    last_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: ClerkEmailAddress[];
  };
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getSupabaseClient() {
  const supabaseUrl = getEnv("SUPABASE_URL");
  const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_ANON_KEY") || getEnv("SUPABASE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase configuration. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) are set.");
  }

  return createClient(supabaseUrl, supabaseKey);
}

function extractEmail(user: ClerkUserCreated["data"]): string | undefined {
  const emails = user.email_addresses || [];
  if (!emails.length) return undefined;

  if (user.primary_email_address_id) {
    const primary = emails.find(e => e.id === user.primary_email_address_id);
    if (primary) return primary.email_address;
  }
  return emails[0]?.email_address;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ClerkUserCreated;

    if (!payload || payload.type !== "user.created") {
      return new Response(null, { status: 204 });
    }

    const user = payload.data;
    const clerkId = user.id;
    const email = extractEmail(user);
    const createdAtMs = typeof user.created_at === "string" ? Number(user.created_at) : user.created_at;
    const createdAt = Number.isFinite(createdAtMs) ? new Date(createdAtMs as number) : new Date();
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || null;

    if (!clerkId || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields (id/email) from Clerk payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("users")
      .upsert(
        {
          id: clerkId,
          email,
          created_at: createdAt.toISOString(),
          full_name: fullName,
        },
        { onConflict: "id" }
      );

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


