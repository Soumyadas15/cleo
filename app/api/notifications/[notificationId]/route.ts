import { db } from "@/lib/db";

interface IParams {
    notificationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try{
        const { notificationId } = params;

        const notification = await db.notification.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!notification) {
            return new Response('Notification not found', { status: 404 });
        }

        const notificationRead = await db.notification.update({
            where: {
                id: notificationId
            },
            data: {
                isRead: true
            }
        })

        return new Response('Notification marked as read', { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}