// app\auth.d.ts
declare module '#auth' {
  interface SessionData {
    id: string
    email: string
    name: string
  }
}