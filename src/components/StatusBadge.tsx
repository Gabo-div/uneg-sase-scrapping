import useStatus from "@/hooks/useStatus";
import { twMerge } from "tailwind-merge";

export default function StatusBadge() {
  const status = useStatus();

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-full border border-zinc-500 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-800",
        status === "down" &&
          "border-red-800 bg-red-50 dark:border-red-950 dark:bg-red-950",
        status === "up" &&
          "border-green-800 bg-green-50 dark:border-green-950 dark:bg-green-950",
        status === "maintenance" &&
          "border-yellow-800 bg-yellow-50 dark:border-yellow-950 dark:bg-yellow-950",
      )}
    >
      <div
        className={twMerge(
          "size-4 rounded-full bg-zinc-500 dark:bg-zinc-200",
          status === "down" && "bg-red-800 dark:bg-red-200",
          status === "up" && "bg-green-800 dark:bg-green-200",
          status === "maintenance" && "bg-yellow-800 dark:bg-yellow-200",
        )}
      ></div>
      <span
        className={twMerge(
          "text-xs font-bold text-zinc-500 uppercase dark:text-zinc-200",
          status === "down" && "text-red-800 dark:text-red-200",
          status === "up" && "text-green-800 dark:text-green-200",
          status === "maintenance" && "text-yellow-8000 dark:text-yellow-200",
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
