import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div className="rounded-full bg-blue-100 p-4">
          <Icon
            size={30}
            className="text-blue-600"
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;