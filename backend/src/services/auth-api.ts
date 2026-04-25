import type { AuthUser, Role } from "@/lib/auth-context";

const API_BASE = "http://localhost:5000";

export async function registerUser(payload: {
  name: string;
  email: string;
  role: Role;
  faceDescriptor: number[];
}): Promise<AuthUser> {
  const res = await fetch(API_BASE + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
  return (await res.json()).user;
}

export async function loginWithFace(faceDescriptor: number[]): Promise<AuthUser> {
  const res = await fetch(API_BASE + '/login-face', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ faceDescriptor }),
  });
  if (!res.ok) throw new Error('Face not recognized');
  return (await res.json()).user;
}

export async function listUsers(): Promise<AuthUser[]> {
  const res = await fetch(API_BASE + '/users');
  if (!res.ok) throw new Error('Failed to load users');
  return (await res.json()).users;
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(API_BASE + '/user/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
}