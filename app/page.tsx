"use client";

import { useState } from "react";
import { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "../app/actions";
import waliasLogo from "@/public/walias-logo.svg";
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
      url: "https://instagram.com/lacryptaok",
    },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/lacryptaok" },
    { name: "GitHub", icon: Github, url: "https://github.com/lacryptaok" },
    { name: "Telegram", icon: Send, url: "https://t.me/lacryptaok" },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/lacrypta",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='container px-10 mx-auto flex-grow'>
        <header className='pt-12 pb-0 flex justify-center items-center relative'>
          <div className='relative mx-4 sm:mx-12 md:mx-24 lg:mx-32'>
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[320px] h-[80px] bg-gray-300 rounded-full filter blur-xl opacity-60'></div>
            <Image
              src={waliasLogo}
              alt='Walias.io Logo'
              width={360}
              height={96}
              className='h-24 w-auto relative z-10'
              priority
            />
          </div>
        </header>
        <main className='pt-8 pb-16 md:py-10 lg:py-18'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
              just email money
            </h1>
            <p className='mt-6 text-lg text-muted-foreground md:text-xl'>
              Manage <b>lightning domains</b> easily and build the path for
              hyperbitcoinization using domain-driven philosophy
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
      </div>
      <footer className='w-full py-12 text-center text-sm bg-gray-200'>
        <div className='flex flex-col items-center space-y-4 text-[#2a2a2a]'>
          <p>
            &copy; {new Date().getFullYear()} Walias.io. All rights reserved.
          </p>
          <div className='flex justify-center space-x-4'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-[#3b82f6] transition-colors'
              >
                <link.icon className='w-6 h-6' />
                <span className='sr-only'>{link.name}</span>
              </a>
            ))}
          </div>
          <div className='flex items-center justify-center'>
            <span className='mr-2'>Made by</span>
            <a
              href='https://lacrypta.ar'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-80 transition-opacity'
            >
              <Image
                src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/la-crypta-logo-F1HY0cw8iWJMm4PXy2IaBm34FIAxQx.svg'
                alt='La Crypta Logo'
                width={77}
                height={18}
                className='inline-block'
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
