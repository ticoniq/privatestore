import { LoginForm } from "./loginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function HomePage() {
  return (
    <LoginForm />
  );
}
