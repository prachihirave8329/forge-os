import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import IdeasTab from "../components/project/IdeasTab";
import TasksTab from "../components/project/TasksTab";
import LifecycleTab from "../components/project/LifecycleTab";

import {
  getProject,
  getUsers,
  assignMember,
} from "../services/projectService";
import { getTasks } from "../services/taskService";
import { getIdeas } from "../services/ideaService";
import {
  ArrowLeft,
  FolderKanban,
  UserCircle,
  LayoutDashboard,
  Lightbulb,
  CheckSquare,
  GitBranch,
} from "lucide-react";

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
  owner: User;
  members: User[];
}

type Tab =
  | "overview"
  | "ideas"
  | "tasks"
  | "lifecycle";

function ProjectView() {
  const { projectId } = useParams();
  const { user } = useAuth();

  const [project, setProject] =
    useState<Project | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] =
    useState("");

  const [loading, setLoading] =
    useState(true);
const [taskCount, setTaskCount] = useState(0);
const [ideaCount, setIdeaCount] = useState(0);
  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
 loadTaskCount();
    loadIdeaCount();
      if (user?.role === "admin") {
        loadUsers();
      }
    }
  }, [projectId]);

  const loadProject = async (
    id: string
  ) => {
    try {
      const data = await getProject(id);
      setProject(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const loadTaskCount = async () => {
  if (!projectId) return;

  try {
    const tasks = await getTasks(projectId);
    setTaskCount(tasks.length);
  } catch (error) {
    console.error(error);
  }
};

const loadIdeaCount = async () => {
  if (!projectId) return;

  try {
    const ideas = await getIdeas(projectId);
    setIdeaCount(ideas.length);
  } catch (error) {
    console.error(error);
  }
};

  const handleAssignMember =
    async () => {
      if (
        !projectId ||
        !selectedUser
      ) {
        return;
      }

      try {
        await assignMember(
          projectId,
          selectedUser
        );

        await loadProject(projectId);

        setSelectedUser("");

        alert(
          "Member assigned successfully!"
        );
      } catch (error) {
        console.error(error);
        alert(
          "Failed to assign member"
        );
      }
    };

  if (loading) {
    return (
      <div className="p-8">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8">
        <h2>Project not found.</h2>

        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8 rounded-2xl bg-white p-8 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FolderKanban
              size={42}
              className="text-blue-600"
            />

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {project.name}
              </h1>

              <p className="mt-2 text-gray-500">
                {project.description}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
            {project.lifecyclePhase}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-3 text-gray-600">
          <UserCircle size={20} />

          <span>
            Owner: {project.owner.name}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() =>
            setActiveTab("overview")
          }
          className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
            activeTab === "overview"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <LayoutDashboard size={18} />
          Overview
        </button>

        <button
          onClick={() =>
            setActiveTab("ideas")
          }
          className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
            activeTab === "ideas"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Lightbulb size={18} />
          Ideas
        </button>

        <button
          onClick={() =>
            setActiveTab("tasks")
          }
          className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
            activeTab === "tasks"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <CheckSquare size={18} />
          Tasks
        </button>

        <button
          onClick={() =>
            setActiveTab("lifecycle")
          }
          className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
            activeTab === "lifecycle"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <GitBranch size={18} />
          Lifecycle
        </button>
      </div>

      {/* Content */}
      <div className="rounded-2xl bg-white p-8 shadow-md min-h-[450px]">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="mb-3 text-xl font-bold">
                Project Description
              </h2>

              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
<div className="grid gap-5 md:grid-cols-4">
  <div className="rounded-xl bg-blue-50 p-5">
    <p className="text-sm text-gray-500">
      Current Phase
    </p>

    <h3 className="mt-2 text-2xl font-bold text-blue-700">
      {project.lifecyclePhase}
    </h3>
  </div>

  <div className="rounded-xl bg-green-50 p-5">
    <p className="text-sm text-gray-500">
      Team Members
    </p>

    <h3 className="mt-2 text-2xl font-bold text-green-700">
      {project.members.length}
    </h3>
  </div>

  <div className="rounded-xl bg-yellow-50 p-5">
    <p className="text-sm text-gray-500">
      Tasks
    </p>

    <h3 className="mt-2 text-2xl font-bold text-yellow-700">
      {taskCount}
    </h3>
  </div>

  <div className="rounded-xl bg-purple-50 p-5">
    <p className="text-sm text-gray-500">
      Ideas
    </p>

    <h3 className="mt-2 text-2xl font-bold text-purple-700">
      {ideaCount}
    </h3>
  </div>
</div>
            
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-bold">
                Team Members
              </h2>

              {project.members.length === 0 ? (
                <p className="text-gray-500">
                  No members assigned.
                </p>
              ) : (
                <div className="space-y-3">
                  {project.members.map(
                    (member) => (
                      <div
                        key={member._id}
                        className="rounded-lg bg-gray-50 p-4"
                      >
                        <p className="font-semibold">
                          {member.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {member.email}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {user?.role === "admin" && (
              <div className="rounded-xl border border-gray-200 p-6">
                <h2 className="mb-4 text-xl font-bold">
                  Assign Member
                </h2>

                <div className="flex gap-3">
                  <select
                    value={selectedUser}
                    onChange={(e) =>
                      setSelectedUser(
                        e.target.value
                      )
                    }
                    className="rounded-lg border px-3 py-2"
                  >
                    <option value="">
                      Select User
                    </option>

                    {users.map((u) => (
                      <option
                        key={u._id}
                        value={u._id}
                      >
                        {u.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={
                      handleAssignMember
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Assign Member
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ideas" && (
          <IdeasTab
            projectId={project._id}
          />
        )}

        {activeTab === "tasks" && (
          <TasksTab
            projectId={project._id}
          />
        )}

        {activeTab === "lifecycle" && (
          <LifecycleTab
            projectId={project._id}
            currentPhase={
              project.lifecyclePhase
            }
            onPhaseAdvanced={() =>
              loadProject(project._id)
            }
          />
        )}
      </div>
    </div>
  );
}

export default ProjectView;