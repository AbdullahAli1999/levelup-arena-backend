import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const DISCORD_LINK = "https://discord.gg/3NzXWzy4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProNotificationRequest {
  email: string;
  userName: string;
  gamerTag: string;
  selectedGame: string;
  status: 'approved' | 'rejected' | 'received';
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userName, gamerTag, selectedGame, status, rejectionReason }: ProNotificationRequest = await req.json();

    console.log(`Sending pro application ${status} notification to ${email}`);

    let subject: string;
    let htmlContent: string;

    if (status === 'received') {
      subject = "✅ Pro Player Application Received";
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎮 Application Received!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">We're reviewing your pro player application</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-top: 0;">Hello <strong>@${gamerTag}</strong>,</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #667eea;">✅ Application Submitted Successfully</h2>
                <p>Thank you for applying to become a pro player for <strong>${selectedGame}</strong> at LevelUp Academy. We've received your application and it's now under review by our moderation team.</p>
              </div>

              <div class="card" style="background: #f0fdf4; border-left: 4px solid #22c55e;">
                <h3 style="margin-top: 0; color: #16a34a;">📋 What Happens Next?</h3>
                <ul>
                  <li><strong>Review Process:</strong> Our team will carefully review your submitted documents and qualifications</li>
                  <li><strong>Timeline:</strong> You can expect a decision within 3-5 business days</li>
                  <li><strong>Email Notification:</strong> We'll send you an email once the review is complete</li>
                  <li><strong>Dashboard Updates:</strong> Check your dashboard for application status updates</li>
                </ul>
              </div>

              <div class="card">
                <h3 style="margin-top: 0; color: #333;">📝 Application Summary</h3>
                <p><strong>Game:</strong> ${selectedGame}</p>
                <p><strong>Gamer Tag:</strong> @${gamerTag}</p>
                <p><strong>Status:</strong> <span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: bold;">Under Review</span></p>
              </div>

              <p style="margin-top: 30px;">Thank you for your interest in joining our pro player community. We appreciate your patience during the review process.</p>
              
              <p style="margin-bottom: 0;">Best regards,<br><strong>The LevelUp Academy Team</strong></p>
            </div>

            <div class="footer">
              <p>LevelUp Academy - Professional Esports Training Platform</p>
              <p>This email was sent because you submitted a pro player application.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (status === 'approved') {
      subject = "🎉 Your Pro Player Application Has Been Approved!";
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .button { display: inline-block; background: #5865F2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
            .badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">🎮 Congratulations!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Your Pro Player Application Has Been Approved</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-top: 0;">Hello <strong>${userName}</strong> (@${gamerTag}),</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #667eea;">✅ Application Approved</h2>
                <p>We're thrilled to inform you that your application for <strong>${selectedGame}</strong> has been approved! You are now an official <span class="badge">PRO PLAYER</span> at LevelUp Academy.</p>
              </div>

              <div class="card">
                <h3 style="margin-top: 0; color: #333;">What's Next?</h3>
                <ul>
                  <li><strong>Access Your Dashboard:</strong> Log in to your pro player dashboard to set up your profile and availability</li>
                  <li><strong>Set Your Rates:</strong> Configure your coaching rates and session preferences</li>
                  <li><strong>Join Discord:</strong> Connect with other pro players and receive exclusive opportunities</li>
                  <li><strong>Start Coaching:</strong> Begin accepting bookings from players looking to improve</li>
                  <li><strong>Build Your Reputation:</strong> Earn reviews and grow your coaching presence</li>
                </ul>
              </div>

              <div class="card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <h3 style="margin-top: 0; color: white;">🎯 Your Pro Benefits</h3>
                <ul style="color: white;">
                  <li>Access to exclusive pro-only Discord channels</li>
                  <li>Featured placement in trainer selection</li>
                  <li>Priority support from our moderation team</li>
                  <li>Networking opportunities with other pros</li>
                  <li>Potential tournament and event invitations</li>
                  <li>Revenue sharing on coaching sessions</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${DISCORD_LINK}" class="button">Join Pro Discord Community</a>
              </div>

              <div class="card">
                <p style="margin: 0;"><strong>Important:</strong> Please review our Pro Player Code of Conduct in your dashboard. Maintaining professional standards is essential to remaining in good standing.</p>
              </div>

              <p style="margin-top: 30px;">Welcome to the team! We're excited to see you succeed and help our community grow.</p>
              
              <p style="margin-bottom: 0;">Best regards,<br><strong>The LevelUp Academy Team</strong></p>
            </div>

            <div class="footer">
              <p>LevelUp Academy - Professional Esports Training Platform</p>
              <p>This email was sent because you applied for pro player status.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      subject = "Update on Your Pro Player Application";
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .feedback-box { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Pro Player Application Update</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Application Status: Under Review</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-top: 0;">Hello <strong>${userName}</strong> (@${gamerTag}),</p>
              
              <div class="card">
                <h2 style="margin-top: 0; color: #dc2626;">Application Status</h2>
                <p>Thank you for your interest in becoming a pro player for <strong>${selectedGame}</strong> at LevelUp Academy. After careful review by our moderation team, we're unable to approve your application at this time.</p>
              </div>

              <div class="feedback-box">
                <h3 style="margin-top: 0; color: #dc2626;">📋 Reviewer Feedback</h3>
                <p style="margin: 0; white-space: pre-wrap;">${rejectionReason || 'Please review the requirements and reapply with updated documentation.'}</p>
              </div>

              <div class="card">
                <h3 style="margin-top: 0; color: #333;">What You Can Do Next</h3>
                <ul>
                  <li><strong>Address the Feedback:</strong> Review the specific points mentioned above</li>
                  <li><strong>Improve Your Skills:</strong> Continue practicing and competing in tournaments</li>
                  <li><strong>Gather Evidence:</strong> Collect better quality screenshots, videos, and documentation</li>
                  <li><strong>Achieve Requirements:</strong> Work towards meeting the minimum rank and achievement criteria</li>
                  <li><strong>Reapply:</strong> You're welcome to submit a new application once you've addressed the feedback</li>
                </ul>
              </div>

              <div class="card" style="background: #f0fdf4; border-left: 4px solid #22c55e;">
                <h3 style="margin-top: 0; color: #16a34a;">💡 Tips for Reapplication</h3>
                <ul>
                  <li>Provide clear, high-quality screenshots of your rank</li>
                  <li>Include detailed tournament history with placements</li>
                  <li>Showcase your best gameplay clips or highlights</li>
                  <li>Write a comprehensive bio highlighting your experience</li>
                  <li>Ensure all documents are recent and verifiable</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://levelup.app/pro-game-selection" class="button">Reapply for Pro Status</a>
              </div>

              <p style="margin-top: 30px;">We appreciate your interest in becoming part of our pro player community. Don't be discouraged - use this as motivation to continue improving!</p>
              
              <p>If you have questions about the feedback or need clarification, please don't hesitate to reach out to our support team.</p>
              
              <p style="margin-bottom: 0;">Best regards,<br><strong>The LevelUp Academy Team</strong></p>
            </div>

            <div class="footer">
              <p>LevelUp Academy - Professional Esports Training Platform</p>
              <p>This email was sent because you submitted a pro player application.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "LevelUp Academy <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const emailData = await emailResponse.json();

    console.log(`Pro application ${status} email sent successfully to ${email}:`, emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-pro-application-status function:", error);
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
