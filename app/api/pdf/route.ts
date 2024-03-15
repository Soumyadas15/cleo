import { NextApiRequest, NextApiResponse } from 'next';
import { initialProfile } from '@/lib/initial-profile';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { parseISO, format } from 'date-fns';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try{
      const currentUser = await initialProfile();

      if (!currentUser) {
          return new Response("User not authenticated", { status: 401 });
      }

      const body = await req.json();
      const { startDate, endDate, projectId } = body;

      if (!startDate || !endDate ||!projectId) {
          return new Response("Missing required fields", { status: 400 });
      }

      const audits = await db.audit.findMany({
        where: {
          projectId: projectId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      console.log(audits)

      const fonts = {
        Roboto: {
          normal: 'path/to/roboto-regular.ttf',
          bold: 'path/to/roboto-bold.ttf',
          italics: 'path/to/roboto-italic.ttf',
          bolditalics: 'path/to/roboto-bolditalic.ttf'
        }
      };

      const printer = new PdfPrinter(fonts);

      // const docDefinition: TDocumentDefinitions = {
      //   content: [
      //     {
      //       table: {
      //         headerRows: 1,
      //         body: [
      //           [{ text: 'Date', style: 'tableHeader' }, { text: 'Body', style: 'tableHeader' }],
      //           ...audits.map(audit => [
      //             { text: format(parseISO(audit.createdAt.toString()), 'yyyy-MM-dd'), style: 'tableData' },
      //             { text: audit.body, style: 'tableData' }
      //           ]),
      //         ]
      //       },
      //       layout: 'lightHorizontalLines',
      //     }
      //   ],
      //   styles: {
      //     tableHeader: {
      //       bold: true,
      //       fontSize: 13,
      //       color: 'black'
      //     },
      //     tableData: {
      //       fontSize: 11,
      //     },
      //   }
      // };

      // const pdfDoc = printer.createPdfKitDocument(docDefinition);
      return new Response("ok", { status: 200, headers: { 'Content-Type': 'application/json', 'Content-Disposition': `attachment; filename="audit_report.pdf"` } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error creating member');
        }
    }
}
