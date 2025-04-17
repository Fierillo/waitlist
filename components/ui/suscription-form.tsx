"use client";

import { useState } from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/app/actions";
import { Loader2, CheckCircle } from "lucide-react";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    startTransition(() => {
      joinWaitlist(formData).then((result) => {
        if (result.success) {
          setIsSuccess(true);
        }
      });
    });
  };

  return (
    <div className="mt-5 max-w-md mx-auto">
      {isSuccess ? (
        <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <div className="text-2xl font-semibold text-green-400">
            ¡Gracias por unirte a nuestra lista de espera!
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row sm:gap-2"
        >
          <Input
            type="email"
            placeholder="Ingresa tu mail"
            className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Button
            type="submit"
            size="lg"
            className="bg-orange-500 hover:bg-orange-300 text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Suscribite"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}