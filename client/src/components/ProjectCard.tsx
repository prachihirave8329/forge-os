import { FolderKanban, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


interface User {
  _id: string;
  name: string;
  email: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  lifecyclePhase: string;
  members: User[];
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Planning":
        return "bg-blue-100 text-blue-700";

      case "Analysis":
        return "bg-indigo-100 text-indigo-700";

      case "Design":
        return "bg-purple-100 text-purple-700";

      case "Development":
        return "bg-yellow-100 text-yellow-700";

      case "Testing":
        return "bg-orange-100 text-orange-700";

      case "Deployment":
        return "bg-green-100 text-green-700";

      case "Maintenance":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <FolderKanban
          size={32}
          className="text-blue-600"
        />

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getPhaseColor(
            project.lifecyclePhase
          )}`}
        >
          {project.lifecyclePhase}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-800">
        {project.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-gray-500">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={18} />

          <span>{project.members.length} Members</span>
        </div>

        <Link
          to={`/projects/${project._id}`}
          className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
        >
          Open

          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;