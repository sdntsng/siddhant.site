import fs from 'fs';
import path from 'path';

async function sendDraft() {
    const plunkKey = process.env.PLUNK_SECRET_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!plunkKey || !adminEmail) {
        console.error('Missing environment variables: PLUNK_SECRET_KEY or ADMIN_EMAIL');
        process.exit(1);
    }

    const outDir = path.join(process.cwd(), 'out');
    const draftPath = path.join(outDir, 'email-draft.html');

    if (!fs.existsSync(draftPath)) {
        console.error('Draft file not found in out/email-draft.html');
        // If no draft was generated (no new posts), we should probably exit gracefully or error depending on workflow
        // For now, assuming if this script runs, a draft SHOULD exist.
        process.exit(1);
    }

    const htmlContent = fs.readFileSync(draftPath, 'utf-8');

    // Extract title for subject line if possible, or use generic
    // Simple regex to find h1, or we could pass it from the gen script. 
    // For now, let's use a generic subject or try to parse
    const titleMatch = htmlContent.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'New Post Draft';

    console.log(`Sending draft "${title}" to ${adminEmail}...`);

    try {
        const response = await fetch('https://next-api.useplunk.com/v1/transactional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plunkKey}`
            },
            body: JSON.stringify({
                to: adminEmail,
                subject: `[Draft] ${title}`,
                body: htmlContent
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Plunk API Error: ${response.status} ${error}`);
        }

        console.log('✅ Draft email sent successfully!');
    } catch (error) {
        console.error('Failed to send draft:', error);
        process.exit(1);
    }
}

sendDraft();
