import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const honeypot = (formData.get('name-honey') || '').toString();
    const email = (formData.get('Email') || '').toString().trim();
    const sourcePage = (formData.get('sourcePage') || '').toString().trim();

    if (honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Thanks for subscribing!' });
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Please enter an email address.' },
        { status: 400 }
      );
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN) {
      return NextResponse.json(
        { success: false, message: 'Newsletter email service is not configured.' },
        { status: 500 }
      );
    }

    const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

    const htmlBody = `
      <h2>New Newsletter Subscriber</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>Source Page</strong></td>
            <td>${sourcePage || 'Unknown'}</td>
          </tr>
        </tbody>
      </table>
    `;

    const response = await client.sendEmail({
      From: 'Chairy Newsletter New Subscriber <forms@hungryramwebdesign.com>',
      To: 'Info@chairyapp.com',
      ReplyTo: email,
      Subject: 'Newsletter Subscription',
      HtmlBody: htmlBody,
    });

    if (response?.Message === 'OK') {
      return NextResponse.json({ success: true, message: 'Thanks for subscribing!' });
    }

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
