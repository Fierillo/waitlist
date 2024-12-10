"use client";

import { useState } from "react";
import { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "./actions";
import {
  Loader2,
  CheckCircle,
  Instagram,
  Twitter,
  Github,
  Send,
  MessageCircle,
} from "lucide-react";

export default function LandingPage() {
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
        } else {
          // Handle error case if needed
        }
      });
    });
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/lacrypta",
    },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/lacrypta" },
    { name: "GitHub", icon: Github, url: "https://github.com/lacrypta" },
    { name: "Telegram", icon: Send, url: "https://t.me/lacrypta" },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/lacrypta",
    },
  ];

  return (
    <div className='min-h-screen bg-[#f6f6f6]'>
      <div className='container px-4 mx-auto'>
        <header className='py-6 flex justify-center'>
          <Image
            src='/walias-logo-EIUuROW70TCNVSnf4bjXhXTKDTWrnN.png'
            alt='Walias.io Logo'
            width={180}
            height={48}
            className='h-12 w-auto'
            priority
          />
        </header>
        <main className='py-20 md:py-32 lg:py-40'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
              The Future of Digital Identity
            </h1>
            <p className='mt-6 text-lg text-muted-foreground md:text-xl'>
              Join the waitlist to be among the first to experience the next
              generation of digital identity management.
            </p>
            <div className='mt-10 max-w-md mx-auto'>
              {isSuccess ? (
                <div className='flex flex-col items-center space-y-4 animate-fade-in-up'>
                  <CheckCircle className='w-16 h-16 text-green-500' />
                  <div className='text-2xl font-semibold text-green-600'>
                    Thanks for joining our waitlist!
                  </div>
                  <div className='mt-8'>
                    <p className='text-lg mb-4'>
                      Meanwhile, follow us on La Crypta:
                    </p>
                    <div className='flex justify-center space-x-6'>
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-gray-600 hover:text-[#3b82f6] transition-colors'
                        >
                          <link.icon className='w-8 h-8' />
                          <span className='sr-only'>{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 sm:flex-row sm:gap-2'
                  >
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      className='flex-1'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                    />
                    <Button
                      type='submit'
                      size='lg'
                      className='bg-[#3b82f6] hover:bg-[#2563eb]'
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Joining...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </form>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    Be the first to know when we launch. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </div>
        </main>
        <footer className='py-12 text-center text-sm text-muted-foreground'>
          <p>
            &copy; {new Date().getFullYear()} Walias.io. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
