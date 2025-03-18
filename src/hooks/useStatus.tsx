import ky from "ky";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useStatus() {
  const [status, setStatus] = useState<
    "checking" | "maintenance" | "down" | "up"
  >("checking");

  const result = useSWR("status", async () => {
    return await ky
      .get("https://servicio.uneg.edu.ve/sase/principal/login.php")
      .text();
  });

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
