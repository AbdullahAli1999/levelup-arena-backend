import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApprovalEmailRequest {
  email: string;
  name: string;
  type: 'trainer' | 'pro' | 'moderator';
  status: 'approved' | 'rejected';
  reason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, type, status, reason }: ApprovalEmailRequest = await req.json();

    console.log(`Sending ${status} email to ${email} for ${type} application`);

    const isApproved = status === 'approved';
    const userType = type === 'trainer' ? 'Trainer' : type === 'pro' ? 'Pro Player' : 'Moderator';
    
    let subject: string;
    let htmlContent: string;

    if (isApproved) {
      subject = `🎉 Your ${userType} Application Has Been Approved!`;
      
      const approvalMessages = {
        trainer: {
          welcome: 'You can now start creating training sessions and helping players improve their skills.',
          features: `
            <li>Create and manage training sessions</li>
            <li>Set your own hourly rates</li>
            <li>Build your reputation with reviews</li>
            <li>Access the trainer dashboard</li>
          `
        },
        pro: {
          welcome: 'You are now recognized as a professional player in our academy.',
          features: `
            <li>Access exclusive pro player features</li>
            <li>Connect with potential teams and sponsors</li>
            <li>Showcase your achievements</li>
            <li>Access the pro dashboard</li>
          `
        },
        moderator: {
          welcome: 'You can now help manage the LevelUp Academy community.',
          features: `
            <li>Review and approve pro player applications</li>
            <li>Moderate contracts and agreements</li>
            <li>Review user feedback and reports</li>
            <li>Access the moderator dashboard</li>
          `
        }
      };

      const typeKey = type as 'trainer' | 'pro' | 'moderator';
      const messages = approvalMessages[typeKey];

      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; }
              .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { background: #f7f7f7; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 10px 10px; }
              .highlight { background: #f0f7ff; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 4px; }
              ul { padding-left: 20px; }
              li { margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">🎉 Congratulations!</h1>
              </div>
              <div class="content">
                <h2 style="color: #667eea; margin-top: 0;">Welcome to LevelUp Academy, ${name}!</h2>
                <p style="font-size: 16px;">We're excited to inform you that your ${userType.toLowerCase()} application has been <strong style="color: #10b981;">approved</strong>!</p>
                
                <div class="highlight">
                  <p style="margin: 0;"><strong>Your account is now active!</strong></p>
                </div>

                <p>${messages.welcome}</p>

                <p><strong>What's Next?</strong></p>
                <ul>
                  ${messages.features}
                  <li>Join our Discord community: <a href="https://discord.gg/3NzXWzy4" style="color: #667eea;">https://discord.gg/3NzXWzy4</a></li>
                </ul>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovable.app') || 'https://levelup.lovable.app'}" class="button">
                    Go to Dashboard
                  </a>
                </div>

                <p style="color: #666; font-size: 14px;">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
              </div>
              <div class="footer">
                <p style="margin: 0;"><strong>LevelUp Academy</strong> - Saudi Arabia's Premier Esports Academy</p>
                <p style="margin: 10px 0 0 0;">Need help? Contact us at <a href="mailto:support@levelup.academy" style="color: #667eea;">support@levelup.academy</a></p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else {
      subject = `Update on Your ${userType} Application`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; }
              .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { background: #f7f7f7; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 10px 10px; }
              .highlight { background: #fef2f2; padding: 15px; border-left: 4px solid #ef4444; margin: 20px 0; border-radius: 4px; }
              ul { padding-left: 20px; }
              li { margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">Application Update</h1>
              </div>
              <div class="content">
                <h2 style="color: #ef4444; margin-top: 0;">Thank you for your interest, ${name}</h2>
                <p style="font-size: 16px;">Thank you for applying to be a ${userType.toLowerCase()} at LevelUp Academy.</p>
                
                <div class="highlight">
                  <p style="margin: 0;"><strong>Unfortunately, we are unable to approve your application at this time.</strong></p>
                </div>

                ${reason ? `
                  <p><strong>Reason:</strong></p>
                  <p style="background: #f7f7f7; padding: 15px; border-radius: 6px;">${reason}</p>
                ` : ''}

                <p><strong>What You Can Do:</strong></p>
                <ul>
                  <li>Review the requirements for ${userType.toLowerCase()}s on our website</li>
                  <li>Improve your qualifications and experience</li>
                  <li>Reapply once you meet all the criteria</li>
                  <li>Contact us if you have any questions about the decision</li>
                </ul>

                <p style="color: #666; font-size: 14px;">We appreciate your interest in joining LevelUp Academy and encourage you to reapply in the future when you meet all requirements.</p>
              </div>
              <div class="footer">
                <p style="margin: 0;"><strong>LevelUp Academy</strong> - Saudi Arabia's Premier Esports Academy</p>
                <p style="margin: 10px 0 0 0;">Questions? Contact us at <a href="mailto:support@levelup.academy" style="color: #667eea;">support@levelup.academy</a></p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'LevelUp Academy <onboarding@resend.dev>',
        to: [email],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const data = await resendResponse.json();
    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ 
        success: true,
        messageId: data.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-approval-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
