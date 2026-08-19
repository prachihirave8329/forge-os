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
  CheckSquare,
  LogOut,
  Plus,
} from "lucide-react";

import StatCard from "../components/ui/StatCard";

import {
  getProjects,
  createProject,
} from "../services/projectService";

import { getTasks } from "../services/taskService";
import AppLayout from "../layouts/AppLayout";

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
    <AppLayout>
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <PageHeader
              title="Dashboard"
              subtitle={`Welcome back, ${user?.name}!`}
            />

            <div className="-mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500">
                {user?.email}
              </span>

              <span className="text-gray-300">
                •
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 font-medium capitalize text-blue-600">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>


        {/* Statistics */}
        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Overview
            </h2>

            <p className="text-sm text-gray-500">
              A quick summary of your workspace
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

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
        </section>


        {/* Create Project */}
        {user?.role === "admin" && (
          <section className="mb-10">

            <Card className="border border-gray-100">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-lg bg-blue-50 p-2">
                  <Plus
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Create New Project
                  </h2>

                  <p className="text-sm text-gray-500">
                    Add a new project to your workspace
                  </p>
                </div>

              </div>


              <form
                onSubmit={handleCreateProject}
                className="grid gap-5 lg:grid-cols-2"
              >

                <Input
                  label="Project Name"
                  type="text"
                  placeholder="Enter project name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />


                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    rows={1}
                    placeholder="Enter project description..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />
                </div>


                <div className="lg:col-span-2">

                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Create Project
                  </Button>

                </div>

              </form>

            </Card>

          </section>
        )}


        {/* Projects */}
        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                My Projects
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Projects you're currently working on
              </p>
            </div>

            {projects.length > 0 && (
              <span className="text-sm text-gray-500">
                {projects.length}{" "}
                {projects.length === 1
                  ? "project"
                  : "projects"}
              </span>
            )}

          </div>


          {loading ? (

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-56 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}

            </div>

          ) : projects.length === 0 ? (

            <EmptyState
              title="No Projects Yet"
              description="Create your first project to get started."
            />

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))}

            </div>

          )}

        </section>

      </div>
    </AppLayout>
  );
}

export default Dashboard;