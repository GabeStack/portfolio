"use client";

import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FormContact() {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    startTransition(async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20_000); // 20s

      try {
        const res = await fetch("/api/contact.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Accept: "application/json",
          },
          body: new URLSearchParams(
            Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
          ),
        });


        const data: any = await res.json().catch(() => ({}));

        if (!res.ok) {
          // Astro endpoint retorna { message }
          throw new Error(data?.message || "Erro ao enviar mensagem.");
        }

        toast.success("Mensagem enviada com sucesso!");
        formEl.reset();
      } catch (err: any) {
        if (err?.name === "AbortError") {
          toast.error("Tempo esgotado ao enviar. Tente novamente.");
        } else {
          toast.error(err?.message || "Erro ao enviar mensagem.");
        }
      } finally {
        clearTimeout(timeout);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 lg:max-w-xl">
      <input type="text" name="honey" className="hidden" autoComplete="off" />

      <Input name="name" placeholder="Nome" autoComplete="off" required />

      <Input
        type="text"
        name="email"
        placeholder="Email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        autoComplete="off"
        required
      />

      <Textarea
        name="message"
        placeholder="Como posso ajudar?"
        className="w-full h-40 resize-none"
        required
      />

      <Button
        type="submit"
        className="w-auto mr-auto hover:bg-accent-hover transition-colors duration-300"
        disabled={pending}
      >
        {pending ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
