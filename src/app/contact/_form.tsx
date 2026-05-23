"use client";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, Check } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "contact" }),
      });
      if (!r.ok) throw new Error();
      setDone(true);
      toast.success("Thanks! We will respond within 24 hours.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong — try email instead.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border bg-card p-6 space-y-4">
      <div>
        <Label htmlFor="n">Name</Label>
        <Input id="n" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
      </div>
      <div>
        <Label htmlFor="e">Email</Label>
        <Input id="e" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
      </div>
      <div>
        <Label htmlFor="m">Message</Label>
        <Textarea id="m" required value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-32" placeholder="What's on your mind?" />
      </div>
      <Button type="submit" variant="gradient" disabled={busy || done} className="w-full">
        {done ? <><Check className="h-4 w-4" /> Sent</> : <><Send className="h-4 w-4" /> Send message</>}
      </Button>
    </form>
  );
}
