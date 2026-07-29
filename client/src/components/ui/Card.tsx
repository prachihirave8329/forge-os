import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;