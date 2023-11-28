// pages/api/posts/data/[filename].js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import jschardet from 'jschardet';
import iconv from 'iconv-lite';

export default async function handler(req, res) {
    const { filename } = req.query;
    
    try {
        const filePath = path.join(process.cwd(), 'posts', 'data', `${filename}.csv`);
        let csvData = fs.readFileSync(filePath);

        // Detect encoding
        const { encoding } = jschardet.detect(csvData);
        if (encoding !== 'utf-8' && encoding !== 'ascii') {
            // Convert to UTF-8 if not already
            csvData = iconv.decode(csvData, encoding);
        }

        // Optional: Allow custom parse options via query parameters
        const parseOptions = {
            columns: true,
            skip_empty_lines: true,
            relax_quotes: true,
            ...req.query.parseOptions,
        };

        const records = parse(csvData, parseOptions);
        res.status(200).json(records);
    } catch (error) {
        console.error('Error processing CSV:', error); // Improved error logging
        res.status(500).json({ message: 'Error processing the CSV file', error: error.message });
    }
}
