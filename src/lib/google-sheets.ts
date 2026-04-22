import { google } from 'googleapis';

type SheetPayload = Record<string, unknown>;

const normalizeSheetValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
};

export async function sendToSheet(
  data: SheetPayload,
  spreadsheetId: string,
  sheetName = 'Sheet1'
): Promise<boolean> {
  try {
    const privateKey = process.env.SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.SHEETS_CLIENT_EMAIL;

    if (!privateKey || !clientEmail || !spreadsheetId) {
      return false;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const googleSheets = google.sheets({
      version: 'v4',
      auth,
    });

    const rowData: Record<string, unknown> = {
      Timestamp: new Date().toISOString(),
      ...data,
    };

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [Object.values(rowData).map(normalizeSheetValue)],
      },
    });

    return true;
  } catch (error) {
    console.error('[Google Sheets] Error appending row', error);
    return false;
  }
}
