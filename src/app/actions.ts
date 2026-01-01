"use server";

import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email(),
});

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const email = formData.get("email");

    if (!process.env.PLUNK_API_KEY) {
        return { success: false, message: "API Configuration Error" };
    }

    const result = subscribeSchema.safeParse({ email });

    if (!result.success) {
        return { success: false, message: "Invalid email address" };
    }

    try {
        const response = await fetch("https://next-api.useplunk.com/v1/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
            },
            body: JSON.stringify({
                event: "newsletter-subscribe",
                email: result.data.email,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Plunk API Error:", errorData);
            return { success: false, message: "Failed to subscribe. Please try again." };
        }

        return { success: true, message: "Subscribed successfully!" };
    } catch (error) {
        console.error("Subscription error:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}
