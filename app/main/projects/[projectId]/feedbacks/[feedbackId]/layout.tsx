import getFeedbackById from "@/actions/getFeedbacks/getFeedbackById";
import getFeedbacks from "@/actions/getFeedbacks/getFeedbacks";
import getProjectByFeedbackId from "@/actions/getProjects/getProjectByFeedbackId";
import EditFeedbackModal from "@/components/modals/editModals/EditFeedbackModal";
import { FeedbacksClient } from "@/components/pages/projects/feedback/FeedbackClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    feedbackId?: string;
}

export default async function ResourceLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { feedbackId } = params;

    const user = await initialProfile();
    const project = await getProjectByFeedbackId(params);
    //@ts-ignore
    const feedbacks = await getFeedbacks({ projectId: project.id });
    const feedback = await getFeedbackById(params);


    return (  
        <div className="overflow-hidden h-[99%]">
            <FeedbacksClient feedbacks={feedbacks} user={user} project={project}/>
            {/* <EditFeedbackModal feedback={feedback}/> */}
            {children}
        </div>
    );
}