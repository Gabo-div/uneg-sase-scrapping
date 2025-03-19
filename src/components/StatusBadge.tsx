import useStatus from "@/hooks/useStatus";
import { twMerge } from "tailwind-merge";

export default function StatusBadge() {
  const status = useStatus();

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-full border border-zinc-500 bg-zinc-50 p-2",
        status === "down" && "border-red-800 bg-red-50",
        status === "up" && "border-green-800 bg-green-50",
        status === "maintenance" && "border-yellow-800 bg-yellow-50",
      )}
    >
      <div
        className={twMerge(
          "size-4 rounded-full bg-zinc-500",
          status === "down" && "bg-red-800",
          status === "up" && "bg-green-800",
          status === "maintenance" && "bg-yellow-800",
        )}
      ></div>
      <span
        className={twMerge(
          "text-xs font-bold text-zinc-500 uppercase",
          status === "down" && "text-red-800",
          status === "up" && "text-green-800",
          status === "maintenance" && "text-yellow-800",
        )}
      >
        {status === "checking"
          ? "Comprobando estado"
          : status === "down"
            ? "Servidor caido"
            : status === "maintenance"
              ? "En mantenimiento"
              : "Servidor activo"}
      </span>
    </div>
  );
}
