import {
  User,
  Calendar,
  Flag,
  Trash2,
} from "lucide-react";
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
  task: Task;
  onStatusChange: (
    taskId: string,
    status: string
  ) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({
  task,
  onStatusChange,
  onDelete,
}: Props) {
  return (
  <div className="mb-4 rounded-xl bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
    <h3 className="text-lg font-bold text-gray-800">
      {task.title}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      {task.description}
    </p>

    <div className="mt-4 space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <User
          size={16}
          className="text-blue-600"
        />

        <span>
          {task.assignedTo?.name || "Unassigned"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Flag
          size={16}
          className="text-orange-500"
        />

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar
          size={16}
          className="text-green-600"
        />

        <span>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </span>
      </div>
    </div>

    <select
      value={task.status}
      onChange={(e) =>
        onStatusChange(task._id, e.target.value)
      }
      className="mt-5 w-full rounded-lg border p-2"
    >
      <option>Backlog</option>
      <option>Planning</option>
      <option>In Progress</option>
      <option>Review</option>
      <option>Done</option>
    </select>

    <button
      onClick={() => onDelete(task._id)}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
    >
      <Trash2 size={18} />
      Delete
    </button>
  </div>
);
}

export default TaskCard;