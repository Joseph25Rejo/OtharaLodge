// pages/api/send-message.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Create mail transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send SMS using Fast2SMS
async function sendSMS(message: string, phoneNumber: string) {
  const url = 'https://www.fast2sms.com/dev/bulkV2';
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.FAST2SMS_API_KEY || ''
    },
    body: JSON.stringify({
      route: 'q', // Quick SMS Route
      message: message,
      numbers: phoneNumber.replace('+91', ''), // Remove +91 if present
      flash: 0
    })
  };

  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!data.return) {
    throw new Error('SMS sending failed');
  }
  
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Format SMS message (keeping it within 160 characters for single SMS)
    const smsText = `New msg from ${name}:\n${subject.substring(0, 50)}${subject.length > 50 ? '...' : ''}\n${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`;

    // Send both SMS and email concurrently
    const [smsResult, emailResult] = await Promise.all([
      // Send SMS using Fast2SMS
      sendSMS(
        smsText,
        '8431187843' // Your target phone number without +91
      ),

      // Send Email
      emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'joseph25rejo@gmail.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New message from ${name}</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      })
    ]);

    res.status(200).json({ 
      success: true, 
      sms: { result: smsResult },
      email: { messageId: emailResult.messageId }
    });

  } catch (error) {
    console.error('Message sending error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message' 
    });
  }
}