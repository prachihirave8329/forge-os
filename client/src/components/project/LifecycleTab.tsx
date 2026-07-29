import { useEffect, useState } from "react";
import {
  GitBranch,
  CheckCircle2,
  Circle,
  Rocket,
} from "lucide-react";
import {
  getLifecycle,
  updateStep,
  advancePhase,
} from "../../services/lifecycleService";
import { useAuth } from "../../context/AuthContext";

interface LifecycleStep {
  _id: string;
  phase: string;
  title: string;
  completed: boolean;
}

interface Props {
  projectId: string;
  currentPhase: string;
  onPhaseAdvanced: () => void;
}

const phases = [
  "Planning",
  "Analysis",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
];

function LifecycleTab({
  projectId,
  currentPhase,
  onPhaseAdvanced,
}: Props) {
  const { user } = useAuth();

  const [steps, setSteps] = useState<LifecycleStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSteps();
  }, [projectId]);

  const loadSteps = async () => {
    try {
      const data = await getLifecycle(projectId);
      setSteps(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load lifecycle.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (
    id: string,
    completed: boolean
  ) => {
    try {
      await updateStep(id, !completed);
      await loadSteps();
    } catch (error) {
      console.error(error);
      alert("Failed to update step.");
    }
  };

  const handleAdvance = async () => {
    try {
      await advancePhase(projectId);
      await onPhaseAdvanced();
      await loadSteps();
      alert("Project advanced successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to advance phase.");
    }
  };

  const currentSteps = steps.filter(
    (step) => step.phase === currentPhase
  );

  const progress =
    ((phases.indexOf(currentPhase) + 1) /
      phases.length) *
    100;

  if (loading) {
    return <p>Loading lifecycle...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <GitBranch className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Project Lifecycle
          </h2>

          <p className="text-gray-500">
            Track the progress of your software development lifecycle.
          </p>
        </div>
      </div>

      {/* Phase Strip */}
      <div className="mb-8 flex flex-wrap gap-3">
        {phases.map((phase) => (
          <div
            key={phase}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              phase === currentPhase
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {phase}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="font-medium">
            Progress
          </span>

          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Current Phase */}
      <div className="mb-6 rounded-xl bg-blue-50 p-5">
        <p className="text-sm text-gray-500">
          Current Phase
        </p>

        <h3 className="mt-1 text-2xl font-bold text-blue-700">
          {currentPhase}
        </h3>
      </div>

      {/* Checklist */}
      {currentSteps.length === 0 ? (
        <p>No checklist items.</p>
      ) : (
        currentSteps.map((step) => (
          <div
            key={step._id}
            className="mb-3 rounded-xl border bg-white p-4 shadow-sm"
          >
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() =>
                  handleToggle(
                    step._id,
                    step.completed
                  )
                }
              />

              {step.completed ? (
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
              ) : (
                <Circle
                  size={20}
                  className="text-gray-400"
                />
              )}

              <span
                className={
                  step.completed
                    ? "text-green-700 line-through"
                    : "text-gray-700"
                }
              >
                {step.title}
              </span>
            </label>
          </div>
        ))
      )}

      {/* Admin Button */}
      {user?.role === "admin" && (
        <button
          onClick={handleAdvance}
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Rocket size={18} />
          Advance to Next Phase
        </button>
      )}
    </div>
  );
}

export default LifecycleTab;