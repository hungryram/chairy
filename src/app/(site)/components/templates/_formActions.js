'use server'
import { ServerClient } from 'postmark'
import { redirect } from 'next/navigation';

export const submitForm = async (data) => {

    let formData = {}
    let email = '';
    const honeypot = data.get('name-honey')

    data.forEach((value, name) => {
        if (
            !name.includes('$ACTION_ID') &&
            name !== 'bcc' &&
            name !== 'cc' &&
            name !== 'name-honey' &&
            name !== 'sendTo' &&
            name !== 'sendFrom' &&
            name !== 'subject' &&
            name !== 'redirectTo'
        ) {
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
        if (process.env.HUBSPOT_API_KEY) {
            // Define the HubSpot API endpoint for form submissions
            const hubSpotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`

            // Create an object to hold the form data
            const formData = {
                fields: [],
                context: {
                    hutk: data.get('hutk'), // HubSpot tracking cookie (if needed)
                    ipAddress: data.get('ipAddress'), // User's IP address (if needed)
                },
            };

            // Add form fields to the formData object
            data.forEach((value, name) => {
                if (
                    !name.includes('$ACTION_ID') &&
                    name !== 'bcc' &&
                    name !== 'cc' &&
                    name !== 'name-honey' &&
                    name !== 'sendTo' &&
                    name !== 'sendFrom' &&
                    name !== 'subject' &&
                    name !== 'redirectTo'
                ) {
                    formData.fields.push({
                        name,
                        value,
                    });
                }
            });

            // Make a POST request to HubSpot API to submit the form data
            try {
                const response = await fetch(hubSpotEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('it sent OKAY')
                } else {
                    console.error('Error submitting form data to HubSpot', response.status);
                }
            } catch (error) {
                console.error('Error submitting form data to HubSpot', error);
            }
        } else {
            console.error("HubSpot API key is missing.");
        }
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

            if (response?.Message === 'OK') {
                return redirect(`${data.get('redirectTo')}`)
            }
        } else {
            console.error("Postmark API token is missing.");
        }
    }
}