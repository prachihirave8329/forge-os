interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "gray";
}

function Badge({
  children,
  color = "blue",
}: BadgeProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;