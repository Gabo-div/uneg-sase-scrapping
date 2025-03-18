import useStatus from "@/hooks/useStatus";
import { twMerge } from "tailwind-merge";

export default function StatusBadge() {
  const status = useStatus();

  return (
    <div
      className={twMerge(
        "flex items-center border p-2 rounded-full justify-center gap-2 bg-zinc-50 border-zinc-500",
        status === "down" && "bg-red-50 border-red-800",
        status === "up" && "bg-green-50 border-green-800",
        status === "maintenance" && "bg-yellow-50 border-yellow-800",
      )}
    >
      <div
        className={twMerge(
          "size-4 bg-zinc-500 rounded-full",
          status === "down" && "bg-red-800",
          status === "up" && "bg-green-800",
          status === "maintenance" && "bg-yellow-800",
        )}
      ></div>
      <span
        className={twMerge(
          "uppercase text-xs font-bold text-zinc-500",
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
