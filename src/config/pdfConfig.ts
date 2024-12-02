import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function generatePDF(content: string, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const pdfPath = path.join(__dirname, `../tmp/${fileName}.pdf`);
        const doc = new PDFDocument();

        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        doc.fontSize(12).text(content);
        doc.end();

        writeStream.on('finish', () => resolve(pdfPath));
        writeStream.on('error', (error) => reject(error));
    });
}
