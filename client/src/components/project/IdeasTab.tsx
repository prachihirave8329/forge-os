import { useEffect, useState } from "react";
import { createIdea, getIdeas } from "../../services/ideaService";
import {
  Lightbulb,
  FileText,
  Link2,
  Image,
  Video,
  File,
  Plus,
} from "lucide-react";
interface Idea {
  _id: string;
  title: string;
  type: "text" | "link" | "image" | "video" | "document";
  content: string;
  createdAt: string;
}

interface IdeasTabProps {
  projectId: string;
}

function IdeasTab({ projectId }: IdeasTabProps) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<
    "text" | "link" | "image" | "video" | "document"
  >("text");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadIdeas();
  }, [projectId]);

  const loadIdeas = async () => {
    try {
      const data = await getIdeas(projectId);
      setIdeas(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("type", type);
      formData.append("projectId", projectId);

      if (
        type === "image" ||
        type === "video" ||
        type === "document"
      ) {
        if (file) {
          formData.append("file", file);
        }
      } else {
        formData.append("content", content);
      }

      await createIdea(formData);

      setTitle("");
      setContent("");
      setFile(null);
      setType("text");

      await loadIdeas();

      alert("Idea added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create idea");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="rounded-xl bg-yellow-100 p-3">
      <Lightbulb className="text-yellow-600" />
    </div>

    <div>
      <h2 className="text-2xl font-bold">
        Ideas Board
      </h2>

      <p className="text-gray-500">
        Store project ideas, resources and inspiration.
      </p>
    </div>
  </div>
</div>

      <form
  onSubmit={handleSubmit}
  className="mb-8 rounded-2xl bg-gray-50 p-6"
>
<input
  type="text"
  placeholder="Idea title..."
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
  className="mb-4 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
/>
    <select
  value={type}
  onChange={(e) =>
    setType(
      e.target.value as
        | "text"
        | "link"
        | "image"
        | "video"
        | "document"
    )
  }
  className="mb-4 w-full rounded-lg border p-3"
>
          <option value="text">Text</option>
          <option value="link">Link</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
        </select>

        {type === "text" || type === "link" ? (
          <textarea
  placeholder={
    type === "text"
      ? "Describe your idea..."
      : "Paste a useful link..."
  }
  value={content}
  onChange={(e) => setContent(e.target.value)}
  rows={5}
  required
  className="mb-4 w-full rounded-lg border p-3"
/>
        ) : (
          <input
  type="file"
  onChange={(e) =>
    setFile(e.target.files?.[0] || null)
  }
  required
  className="mb-4 w-full rounded-lg border p-3"
/>
        )}

        <button
  type="submit"
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
>
  <Plus size={18} />
  Add Idea
</button>
      </form>

      {loading ? (
        <p>Loading ideas...</p>
      ) : ideas.length === 0 ? (
        <p>No ideas yet.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
  {ideas.map((idea) => (
    <div
      key={idea._id}
      className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex items-center gap-3">
        {idea.type === "text" && (
          <FileText className="text-blue-600" />
        )}

        {idea.type === "link" && (
          <Link2 className="text-green-600" />
        )}

        {idea.type === "image" && (
          <Image className="text-pink-600" />
        )}

        {idea.type === "video" && (
          <Video className="text-red-600" />
        )}

        {idea.type === "document" && (
          <File className="text-purple-600" />
        )}

        <h3 className="text-lg font-bold">
          {idea.title}
        </h3>
      </div>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
        {idea.type}
      </span>

      <div className="mt-4">
        {idea.type === "link" ? (
          <a
            href={idea.content}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {idea.content}
          </a>
        ) : (
          <p className="text-gray-600">
            {idea.content}
          </p>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-400">
        {new Date(idea.createdAt).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>
      )}
    </div>
  );
}

export default IdeasTab;