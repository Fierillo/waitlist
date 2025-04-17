"use server";

import { sendy } from "@/services/sendy";

export async function joinWaitlist(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const email = formData.get("email");

  // Validate email
  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "Please provide a valid email address",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address",
    };
  }

  await sendy.subscribe({
    name: "",
    email,
    listId: process.env.SENDY_LIST_ID!,
  });

  return {
    success: true,
    message: "Thanks for joining our waitlist!",
  };
}
