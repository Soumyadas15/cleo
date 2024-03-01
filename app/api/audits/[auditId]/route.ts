import { db } from "@/lib/db";


interface IParams {
    auditId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    
    const { auditId } = params;

    if (!auditId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.audit.delete({
      where: {
        id: auditId,
      },
    });

    return new Response('Audit deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
