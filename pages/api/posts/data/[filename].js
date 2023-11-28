import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default async function handler(req, res) {
    const { filename } = req.query;
    
    try {
        // Build the file path for the CSV
        const filePath = path.join(process.cwd(), 'posts', 'data', `${filename}.csv`);

        // Read the contents of the CSV file
        const csvData = fs.readFileSync(filePath, 'utf8');

        // Parse the CSV into JSON
        const records = parse(csvData, {
            columns: true,
            skip_empty_lines: true,
            relax_quotes: true, // This will relax the handling of quotes in the CSV
        });

        // Extract query parameters
        const { x, y, plotLabel } = req.query;

        // Filter records based on query parameters
        const filteredRecords = records.map(record => {
            let filteredRecord = {};
            if (x) filteredRecord[x] = record[x];
            if (y) filteredRecord[y] = record[y];
            if (plotLabel) filteredRecord[plotLabel] = record[plotLabel];
            return filteredRecord;
        });

        // Return the filtered data as JSON
        res.status(200).json(filteredRecords.length ? filteredRecords : records);
    } catch (error) {
        // Handle errors (file not found, reading error, etc.)
        res.status(500).json({ message: 'Error reading the CSV file', error });
    }
}
