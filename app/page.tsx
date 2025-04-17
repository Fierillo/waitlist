"use client";

import { useState } from "react";
import { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "../app/actions";
import { BitcoinPriceDisplay } from "@/components/ui/price";
import {
  Loader2,
  CheckCircle,
  Instagram,
  Twitter,
  Github,
  Send,
  MessageCircle,
} from "lucide-react";
import SubscriptionForm from "@/components/ui/suscription-form";

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
        }
      });
    });
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/lacryptaok" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/lacryptaok" },
    { name: "GitHub", icon: Github, url: "https://github.com/lacrypta" },
    { name: "Telegram", icon: Send, url: "https://t.me/lacryptaok" },
    { name: "Discord", icon: MessageCircle, url: "https://discord.gg/lacrypta" },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-black text-white relative'>
      {/* Background image container */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/pizza day bg.jpg")',
          backgroundSize: 'cover', // Changed from 'center' to 'cover' for proper scaling
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Black overlay to control background image opacity */}
        <div
          className='absolute inset-0 bg-black'
          style={{ opacity: 0.8 }} // Adjust opacity here (0 = fully visible image, 1 = fully black)
        ></div>
      </div>
      {/* Content stays above the background and overlay */}
      <div className='relative z-10 container px-10 mx-auto flex-grow'>
        <header className='pt-12 pb-4 flex justify-center items-center relative'>
          {/* Add logo or header content here if needed */}
        </header>
        <main className='pt-8 pb-16 md:py-10 lg:py-18'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-3xl mb-6 tracking-tight text-shadow sm:text-4xl md:text-5xl [-webkit-text-stroke:_1px_black]'>
              ¡SE VIENE!
            </h1>
            <h1 className='text-3xl mb-6 mt-4 font-blatant tracking-tight sm:text-4xl md:text-5xl [-webkit-text-stroke:_1px_black]'>
              The Bitcoin Pizza Day 🍕
            </h1>
            <p className='mt-16 text-lg md:text-xl'>
              Suscribite para enterarte antes que nadie
            </p>
            <SubscriptionForm />
  
            {/* Bitcoin Pizza Day Info Box */}
            <div className='bg-gray-900 p-6 rounded-lg mt-16 mb-8 shadow-lg'>
              <h2 className='text-sm font-bold text-orange-500 mb-3'>
                ¿Qué es el Bitcoin Pizza Day?
              </h2>
              <p className='text-gray-200 text-sm'>
                El 22 de mayo de 2010, Laszlo Hanyecz compró dos pizzas por 10,000 BTC, siendo la primera
                transacción de Bitcoin en el mundo real. Aquellas pizzas que costaron ~$41 USD en su momento,
                hoy valdrían:
              </p>
              <BitcoinPriceDisplay />
            </div>
          </div>
        </main>
      </div>
      {/* Footer that shows La Crypta contacts */} 
      <footer className='w-full py-4 text-center text-sm bg-gray-900 text-gray-200 relative z-20'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex justify-center space-x-4'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-[#3b82f6] transition-colors'
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
                className='inline-block invert'
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}