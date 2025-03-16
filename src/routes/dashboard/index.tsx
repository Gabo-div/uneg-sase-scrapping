import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/dashboard/student" });
  }, [navigate]);

  return null;
}
