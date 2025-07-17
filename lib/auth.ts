import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma";
import {env} from "@/lib/env";
import {emailOTP} from "better-auth/plugins"
import {resend} from "@/lib/resend";

// ----------------------------------------------------------------------

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
    },

    plugins: [
        emailOTP({
            async sendVerificationOTP({email, otp}) {
                await resend.emails.send({
                    from: "Seventy Code LMS <onboarding@resend.dev>",
                    to: [email],
                    subject: 'Seventy Code LMS - Verify your email',
                    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
                });
            },
        })
    ]
});
