import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default async function handler(req, res) {
    const { filename, x, y, plotLabel, vizType } = req.query;
    
    try {
        const filePath = path.join(process.cwd(), 'posts', 'data', `${filename}.csv`);
        const csvData = fs.readFileSync(filePath, 'utf8');
        const records = parse(csvData, {
            columns: true,
            skip_empty_lines: true,
            relax_quotes: true,
        });

        let finalRecords;

        if (vizType === 'plotmap') {
            // For plotmap, always include lat and lon, and plotLabel if it exists
            finalRecords = records.map(record => ({
                lat: record.lat || record.latitude,
                lon: record.lon || record.longitude,
                ...(plotLabel && { [plotLabel]: record[plotLabel] }) // Include plotLabel if it exists
            }));
        } else {
            // For other types, filter based on x, y, and plotLabel
            finalRecords = records.map(record => {
                let filteredRecord = {};
                if (x) filteredRecord[x] = record[x];
                if (y) filteredRecord[y] = record[y];
                if (plotLabel) filteredRecord[plotLabel] = record[plotLabel];
                return filteredRecord;
            }).filter(record => Object.keys(record).length > 0); // Filter out empty records
        }

        res.status(200).json(finalRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error reading the CSV file', error });
    }
}
