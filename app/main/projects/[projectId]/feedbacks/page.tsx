import getFeedbacks from "@/actions/getFeedbacks/getFeedbacks";
import getProjectById from "@/actions/getProjects/getProjectById";
import { FeedbacksClient } from "@/components/pages/projects/feedback/FeedbackClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const FeedbacksPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const feedbacks = await getFeedbacks(params);

    return (
        <div className="flex flex-col h-full">
            <FeedbacksClient feedbacks={feedbacks} user={user} project={project}/>
        </div>
        
    )
}
export default FeedbacksPage;