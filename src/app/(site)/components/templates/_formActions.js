'use server'
import { ServerClient } from 'postmark'
import { redirect } from 'next/navigation';
import { sendToSheet } from '@/lib/google-sheets';
import { submitLeadToHubSpot } from '../../../../lib/hubspot';

export const submitForm = async (data) => {

    let formData = {}
    let sheetData = {}
    let email = '';
    const honeypot = data.get('name-honey')
    const redirectTo = (data.get('redirectTo') || '').toString().trim();
    const googleSheetId = (data.get('googleSheetId') || '').toString().trim();
    const googleSheetName = (data.get('googleSheetName') || '').toString().trim();

    data.forEach((value, name) => {
        if (
            !name.includes('$ACTION_ID') &&
            name !== 'bcc' &&
            name !== 'cc' &&
            name !== 'name-honey' &&
            name !== 'sendTo' &&
            name !== 'sendFrom' &&
            name !== 'subject' &&
            name !== 'redirectTo' &&
            name !== 'googleSheetId' &&
            name !== 'googleSheetName'
        ) {
            if (sheetData[name]) {
                sheetData[name] = Array.isArray(sheetData[name])
                    ? [...sheetData[name], value]
                    : [sheetData[name], value];
            } else {
                sheetData[name] = value;
            }

            if (name === 'Email') {
                email = value;
            } else {
                if (formData[name]) {
                    formData[name] = Array.isArray(formData[name])
                        ? [...formData[name], value]
                        : [formData[name], value];
                } else {
                    formData[name] = value;
                }
            }
        }
    });

    // Handle file upload
    const file = data.get('file');
    if (file) {
        const fileData = await file.arrayBuffer();
        formData.file = {
            Name: file.name,
            Content: Buffer.from(fileData).toString('base64'),
            ContentType: file.type,
        };

        sheetData.fileName = file.name;
        sheetData.fileType = file.type;
        sheetData.fileSize = file.size;
    }

    const tableRows = Object.entries(formData).map(([key, value]) => {
        if (Array.isArray(value)) {
            return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value.join(', ')}</td>
        </tr>
      `;
        } else {
            return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value}</td>
        </tr>
      `;
        }
    });

    const htmlBody = `
    <h2>Contact Form Submission</h2>
    <table>
      <tbody>
        ${tableRows.join('')}
        <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
        </tr>
      </tbody>
    </table>
  `;

    if (honeypot.length === 0) {
        await sendToSheet(
            {
            formType: 'contact',
            ...sheetData,
            },
            googleSheetId || process.env.SHEETS_DEFAULT_SPREADSHEET_ID || '',
            googleSheetName || process.env.SHEETS_DEFAULT_SHEET_NAME || 'Sheet1'
        );

        await submitLeadToHubSpot(data);
    }

    if (honeypot.length === 0) {
        if (process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN) {
            const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

            const response = await client.sendEmail({
                "From": data.get('sendFrom'), // must match sender signature on postmark account
                "To": data.get('sendTo'),
                "Bcc": data.get('bcc'),
                "Cc": data.get('cc'),
                "ReplyTo": email,
                "Subject": data.get('subject'),
                "HtmlBody": htmlBody,
            })
                .then((res) => res)
                .catch((err) => console.error(err))

            if (response?.Message !== 'OK') {
                console.error('Postmark sendEmail did not return OK.');
            }
        } else {
            console.error("Postmark API token is missing.");
        }

        if (redirectTo) {
            return redirect(redirectTo)
        }
    }
}

export const submitNewsletter = async (_prevState, data) => {
    const honeypot = data.get('name-honey') || '';
    const email = (data.get('Email') || '').toString().trim();
    const sourcePage = (data.get('sourcePage') || '').toString().trim();
    const googleSheetId = (data.get('googleSheetId') || '').toString().trim();
    const googleSheetName = (data.get('googleSheetName') || '').toString().trim();

    if (honeypot.length > 0) {
        return {
            success: true,
            message: 'Thanks for subscribing!'
        };
    }

    if (!email) {
        return {
            success: false,
            message: 'Please enter an email address.'
        };
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
        return {
            success: false,
            message: 'Please enter a valid email address.'
        };
    }

    await sendToSheet(
        {
            formType: 'newsletter',
            Email: email,
            sourcePage: sourcePage || 'Unknown',
        },
        googleSheetId || process.env.NEWSLETTER_SHEETS_SPREADSHEET_ID || '',
        googleSheetName || process.env.NEWSLETTER_SHEETS_SHEET_NAME || 'Sheet1'
    );

    await submitLeadToHubSpot(data);

    if (!process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN) {
        return {
            success: false,
            message: 'Newsletter email service is not configured.'
        };
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

    try {
        const response = await client.sendEmail({
                    From: "Chairy Newsletter New Subscriber <forms@hungryramwebdesign.com>",
          To: "Info@chairyapp.com",
          ReplyTo: email,
          Subject: "Newsletter Subscription",
          HtmlBody: htmlBody,
        })

        if (response?.Message === 'OK') {
            return {
                success: true,
                message: 'Thanks for subscribing!'
            };
        }

        return {
            success: false,
            message: 'Something went wrong. Please try again.'
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.'
        };
    }
}