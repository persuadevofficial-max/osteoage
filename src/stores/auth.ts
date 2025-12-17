export interface User {
  email: string;
  name: string;
  role: "doctor" | "admin";
  hospital?: string;
}

const STORAGE_KEY = "user";

export function login(email: string, password: string): User | null {
  // Mock authentication
  if (email === "admin@drwave.com" && password === "admin123") {
    const user: User = {
      email,
      name: "관리자",
      role: "admin",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  if (email && password) {
    const user: User = {
      email,
      name: "김영수",
      role: "doctor",
      hospital: "삼성서울병원",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  return null;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}
