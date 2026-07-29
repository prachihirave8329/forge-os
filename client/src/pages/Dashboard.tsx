import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/ui/EmptyState";
import {
  FolderKanban,
  Users,
  GitBranch,
  Shield,
   CheckSquare
} from "lucide-react";
import StatCard from "../components/ui/StatCard";
import {
  getProjects,
  createProject
} from "../services/projectService";
import { getTasks } from "../services/taskService";

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

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [taskCount, setTaskCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProjects();
    loadTaskCount();
   
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }



  };
const loadTaskCount = async () => {
  try {
    let total = 0;

    const projectsData = await getProjects();

    for (const project of projectsData) {
      const tasks = await getTasks(project._id);
      total += tasks.length;
    }

    setTaskCount(total);
  } catch (error) {
    console.error(error);
  }
};
 const totalProjects = projects.length;

const totalMembers = projects.reduce(
  (count, project) => count + project.members.length,
  0
);

const activePhase =
  projects.length > 0
    ? projects[0].lifecyclePhase
    : "N/A";

  const handleCreateProject = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await createProject({
        name,
        description,
      });

      setName("");
      setDescription("");

      await loadProjects();
      await loadTaskCount();
      alert("Project created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
    
      <div className="mb-8 flex items-center justify-between">
  <div>
    <PageHeader
      title="Dashboard"
      subtitle={`Welcome back, ${user?.name}!`}
    />

    <p className="text-gray-500">
      {user?.email}
    </p>

    <p className="text-sm text-blue-600 font-medium">
      {user?.role}
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
  >
    Logout
  </button>
</div>
<div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  <StatCard
    title="Projects"
    value={totalProjects}
    icon={FolderKanban}
  />

  <StatCard
    title="Members"
    value={totalMembers}
    icon={Users}
  />
<StatCard
  title="Tasks"
  value={taskCount}
  icon={CheckSquare}
/>

 <StatCard
  title="Current Phase"
  value={activePhase}
  icon={GitBranch}
/>
<StatCard
  title="Role"
  value={
    user?.role
      ? user.role.charAt(0).toUpperCase() +
        user.role.slice(1)
      : "-"
  }
  icon={Shield}
/>
</div>
      {user?.role === "admin" && (
  <Card className="mb-10">
    <h2 className="mb-6 text-2xl font-bold text-gray-800">
      Create New Project
    </h2>

    <form
      onSubmit={handleCreateProject}
      className="space-y-4"
    >
      <Input
        label="Project Name"
        type="text"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
          placeholder="Enter project description..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <Button type="submit">
        Create Project
      </Button>
    </form>
  </Card>
)}
<h2 className="mb-6 text-2xl font-bold text-gray-800">
  My Projects
</h2>

{loading ? (
  <p>Loading...</p>
) : projects.length === 0 ? (
  <EmptyState
    title="No Projects Yet"
    description="Create your first project to get started."
  />
) : (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {projects.map((project) => (
      <ProjectCard
        key={project._id}
        project={project}
      />
    ))}
  </div>
)}
      
    </div>
  );
}

export default Dashboard;