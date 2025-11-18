import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DiscordInviteRequest {
  email: string;
  userName: string;
  userType: 'parent' | 'player' | 'pro';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userName, userType }: DiscordInviteRequest = await req.json();

    console.log(`Sending Discord invite to ${email} for ${userType}`);

    const discordLink = "https://discord.gg/3NzXWzy4";
    
    const subjectMap = {
      parent: "Welcome to LevelUp Academy - Join Our Community!",
      player: "Welcome to LevelUp Academy - Join Our Community!",
      pro: "Pro Account Approved - Join Our Discord Community!"
    };

    const messageMap = {
      parent: `
        <h1>Welcome to LevelUp Academy, ${userName}!</h1>
        <p>Thank you for completing your payment. We're excited to have you and your child in our gaming community!</p>
        <p><strong>Join our Discord community to connect with other parents, trainers, and stay updated:</strong></p>
        <p><a href="${discordLink}" style="background-color: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Join Discord Server</a></p>
        <p>Discord Link: <a href="${discordLink}">${discordLink}</a></p>
        <p>Best regards,<br>The LevelUp Academy Team</p>
      `,
      player: `
        <h1>Welcome to LevelUp Academy, ${userName}!</h1>
        <p>Thank you for completing your payment. Your gaming journey starts now!</p>
        <p><strong>Join our Discord community to connect with trainers, other players, and access exclusive content:</strong></p>
        <p><a href="${discordLink}" style="background-color: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Join Discord Server</a></p>
        <p>Discord Link: <a href="${discordLink}">${discordLink}</a></p>
        <p>Best regards,<br>The LevelUp Academy Team</p>
      `,
      pro: `
        <h1>Congratulations, ${userName}!</h1>
        <p>Your Pro Player account has been approved! You can now access all pro features and start offering your expertise to the community.</p>
        <p><strong>Join our exclusive Pro Discord channel to network with other pros, receive support, and stay updated:</strong></p>
        <p><a href="${discordLink}" style="background-color: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Join Discord Server</a></p>
        <p>Discord Link: <a href="${discordLink}">${discordLink}</a></p>
        <p>We're excited to have you on the team!</p>
        <p>Best regards,<br>The LevelUp Academy Team</p>
      `
    };

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "LevelUp Academy <onboarding@resend.dev>",
        to: [email],
        subject: subjectMap[userType],
        html: messageMap[userType],
      }),
    });

    const emailData = await emailResponse.json();

    console.log("Discord invite email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-discord-invite function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
