"use client"

import Heading from "@/components/reusable/Heading";
import { ProjectItem } from "./ProjectItem";

interface ProjectClientProps {
    user?: any;
    projects?: any;
}

export const ProjectClient = ({
    user,
    projects,
}: ProjectClientProps) => {

    // useEffect(() => {
    //     const fetchProjects = async () => {
    //       try {
    //         const response = await axios.get(`http://127.0.0.1:3001/projects?userId=${user.id}`);
    //         setProjects(response.data);
    //       } catch (error) {
    //         console.error('Error fetching projects:', error);
    //       }
    //     };
    
    //     fetchProjects();
    
    //     const intervalId = setInterval(fetchProjects, 100); // Refresh every 100 ms
    
    //     return () => clearInterval(intervalId); // Cleanup on component unmount
    //   }, [user]);


    return (
        <div>
            <Heading 
                title="Your projects"
            />
            <div>
                {projects.map((project: any, index: number) => (
                    <div key={index} className="flex flex-col mt-2">
                    <ProjectItem project={project}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
}