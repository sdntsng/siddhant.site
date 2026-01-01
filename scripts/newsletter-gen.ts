import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import juice from 'juice';
import cheerio from 'cheerio';

async function generateEmail(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        process.exit(1);
    }

    // 1. Read MDX File
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // 2. Convert Markdown to HTML
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);

    const contentHtml = processedContent.toString();

    // 3. Read Template
    const templatePath = path.join(process.cwd(), 'newsletter-template.html');
    if (!fs.existsSync(templatePath)) {
        console.error(`Template not found: ${templatePath}`);
        process.exit(1);
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    // 4. Inject Content
    // Use simple string replacement for placeholders
    let filledTemplate = template
        .replace('{{title}}', data.title || 'Newsletter')
        .replace('{{content}}', contentHtml);

    // 5. Inline CSS
    const inlinedHtml = juice(filledTemplate);

    // 6. Output
    const outDir = path.join(process.cwd(), 'out');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const outPath = path.join(outDir, 'email-draft.html');
    fs.writeFileSync(outPath, inlinedHtml);

    console.log(`✅ Email draft generated at: ${outPath}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: npx tsx scripts/newsletter-gen.ts <path-to-mdx-file>');
    process.exit(1);
}

generateEmail(args[0]);
