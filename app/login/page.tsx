"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2, ShieldCheck } from "lucide-react";
import { createSession } from "@/actions/auth";
import FormField from "@/components/ui/FormField";
import { auth } from "@/lib/firebase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const result = await createSession(idToken);

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or not authorized.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md animate-slide-up-fade px-4">
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
          <div className="border-b border-border/50 bg-muted/30 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Admin Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to continue.
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <FormField label="Email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  placeholder="admin@example.com"
                />
              </FormField>

              <FormField label="Password">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  placeholder="********"
                />
              </FormField>

              {error ? (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
