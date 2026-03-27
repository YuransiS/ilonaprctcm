import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log for debugging
    console.log('Received registration data:', data);

    // TODO: Replace with your actual Google Sheets Webhook URL or Apps Script URL
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (GOOGLE_SHEETS_URL) {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to Google Sheets');
      }
    }

    return NextResponse.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
