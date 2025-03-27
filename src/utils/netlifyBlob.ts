import { v4 as uuidv4 } from 'uuid';

const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';
const NETLIFY_SITE_ID = 'your_site_id'; // Replace with your Netlify site ID
const NETLIFY_ACCESS_TOKEN = 'your_access_token'; // Replace with your Netlify access token

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${NETLIFY_API_URL}/sites/${NETLIFY_SITE_ID}/assets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.url; // Return the URL of the uploaded image
}

export async function saveJournalEntry(entry: { title: string; content: string; imageUrl: string }): Promise<void> {
    const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: uuidv4(),
            ...entry,
            createdAt: new Date().toISOString(),
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to save journal entry');
    }
}

export async function fetchJournalEntries(): Promise<any[]> {
    const response = await fetch('/api/journal-entries');

    if (!response.ok) {
        throw new Error('Failed to fetch journal entries');
    }

    return await response.json();
}