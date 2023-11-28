import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { filename } = req.query;

  try {
    // Construct the full path to the markdown file
    const filePath = path.join(process.cwd(), 'posts/md', `${filename}.md`);

    // Read the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Use gray-matter to parse the markdown file
    const { content, data: metadata } = matter(fileContent);

    // Send the content and metadata back in the response
    res.status(200).json({ content, metadata });
  } catch (error) {
    res.status(500).json({ message: 'Error reading markdown file' });
  }
}
