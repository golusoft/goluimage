import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET || "dev-only-secret-please-change-in-production-min-32-chars";
const key = new TextEncoder().encode(SECRET);

export interface AdminSession {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

export async function signAdminToken(email: string) {
  return await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function verifyAdminToken(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    if (payload.role !== "admin") return null;
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export function checkAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    return { ok: false, reason: "admin-not-configured" as const };
  }
  if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
    return { ok: false, reason: "invalid" as const };
  }
  if (password !== adminPassword) {
    return { ok: false, reason: "invalid" as const };
  }
  return { ok: true as const };
}

export const ADMIN_COOKIE = "gi_admin";
