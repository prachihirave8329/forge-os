import { useEffect, useState } from "react";
import {
  ClipboardList,
  Plus,
  Calendar,
  Flag,
  User,
} from "lucide-react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../services/taskService";
import { getUsers } from "../../services/projectService";
import TaskCard from "./TaskCard";

interface User {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: User;
}

interface Props {
  projectId: string;
}

const columns = [
  "Backlog",
  "Planning",
  "In Progress",
  "Review",
  "Done",
];

function TasksTab({ projectId }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks(projectId);
    setTasks(data);
  };

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateTask = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await createTask({
      title,
      description,
      project: projectId,
      assignedTo,
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setPriority("Medium");
    setDueDate("");

    loadTasks();
  };

  const handleStatusChange = async (
    taskId: string,
    status: string
  ) => {
    await updateTask(taskId, { status });
    loadTasks();
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks();
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
  <div className="rounded-xl bg-blue-100 p-3">
    <ClipboardList className="text-blue-600" />
  </div>

  <div>
    <h2 className="text-2xl font-bold">
      Tasks Board
    </h2>

    <p className="text-gray-500">
      Track work across the project lifecycle.
    </p>
  </div>
</div>
<form
  onSubmit={handleCreateTask}
  className="mb-8 rounded-2xl bg-gray-50 p-6 shadow-sm"
>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        className="mb-4 w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        >
          <option value="">Assign Member</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
        />
<button
  type="submit"
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
>
  <Plus size={18} />
  Create Task
</button>
      </form>

     <div className="grid gap-6 lg:grid-cols-5">
      
        {columns.map((column) => (
          <div
  key={column}
  className="rounded-2xl bg-gray-100 p-4 min-h-[550px]"
><h3 className="mb-5 text-center text-lg font-bold">
              {column}
            </h3>

            {tasks
              .filter(
                (task) => task.status === column
              )
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={
                    handleStatusChange
                  }
                  onDelete={handleDelete}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksTab;