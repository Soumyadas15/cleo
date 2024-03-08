import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


/**
 * Deletes an audit record from the database.
 * Only auditors can delete audit records.
 *
 * @param auditId - The ID of the audit record to delete.
 * @returns A response indicating whether the deletion was successful.
 */

interface IParams {
    auditId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    if (currentUser.role !== "AUDITOR") {
        return new Response("You don't have the required permissions", { status: 401 });
    }
    
    const { auditId } = params;

    
    if (!auditId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.audit.delete({
      where: {
        id: auditId,
      },
    });

    return new Response('Resource deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
