import { checkStatus } from "@/actions/status";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useStatus() {
  const [status, setStatus] = useState<
    "checking" | "maintenance" | "down" | "up"
  >("checking");

  const result = useSWR("status", checkStatus);

  useEffect(() => {
    if (result.error) {
      setStatus("down");
    }

    if (result.data) {
      setStatus("up");
    }
  }, [result]);

  return status;
}
