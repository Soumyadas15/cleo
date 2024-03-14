import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET() {
  const data = {
    employees: [
      {
        name: 'Jerome Villaruel',
        age: '23',
        address: 'Philippines'
      },
      {
        name: 'Richlyn Hermosilla',
        age: '18',
        address: 'Philippines'
      },
      {
        name: 'Lisa Manoban',
        age: '23',
        address: 'South Korea'
      },
      {
        name: 'Jennie Kim',
        age: '24',
        address: 'South Korea'
      },
      {
        name: 'Roseanne Park',
        age: '23',
        address: 'South Korea'
      },
      {
        name: 'Kim Jisoo',
        age: '25',
        address: 'South Korea'
      }
    ],
  };

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const headers = ['Name', 'Age', 'Address'];
  const rows = data.employees.map(employee => [employee.name, employee.age, employee.address]);

  const fontSize = 12;
  const tableTopMargin = page.getHeight() - 70;
  const tableMargin = 50;
  const rowHeight = 20;
  const cellPadding = 5;

  const columnWidths = [150, 50, 150];
  const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

  let y = tableTopMargin;
  headers.forEach((header, columnIndex) => {
    page.drawText(header, {
      x: tableMargin + columnWidths.slice(0, columnIndex).reduce((a, b) => a + b, 0) + cellPadding,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });
  y -= rowHeight;


  rows.forEach(row => {
    row.forEach((cell, columnIndex) => {
      page.drawText(cell, {
        x: tableMargin + columnWidths.slice(0, columnIndex).reduce((a, b) => a + b, 0) + cellPadding,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    });
    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, { status: 200 })
}