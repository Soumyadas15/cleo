import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DataItem {
  [key: string]: any;
}

export function generatePDF(data: DataItem[], startDate?: Date, endDate?: Date) {
  const doc = new jsPDF();
  let firstTableSkipped = false;

  Object.keys(data).forEach((key, index) => {
    //@ts-ignore
    let tableData = data[key];

    if (startDate && endDate) {
      tableData = tableData.filter((item: any) => {
        const itemDate = item?.CreatedAt ? new Date(item.CreatedAt) : null;
        return itemDate && itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Check if any data remains after filtering or if it's the first table
    if (tableData.length > 0 || (index === 0 && !firstTableSkipped)) {
      const tableColumn = Object.keys(tableData[0]);
      const tableRows: any[] = [];

      tableData.forEach((item: any) => {
        const dataRow: any[] = [];

        tableColumn.forEach((column) => {
          dataRow.push(item[column]);
        });

        tableRows.push(dataRow);
      });

      if (!firstTableSkipped) {
        firstTableSkipped = true;
      } else {
        doc.addPage();
      }
      
      doc.text(`Table: ${key}`, 10, 10); // Add a heading for the table
      //@ts-ignore
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20, // Adjust the startY position if needed
        autoSize: true // Automatically adjust column widths based on content
      });
    }
  });

  return doc;
}
