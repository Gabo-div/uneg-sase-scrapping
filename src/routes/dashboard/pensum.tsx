import { createFileRoute } from "@tanstack/react-router";
import useCoursesInfo from "@/hooks/useCoursesInfo";
import { Eye, EyeOff, Table2, Workflow } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import PensumTable from "@/components/pensum/PensumTable";
import PensumGraph from "@/components/pensum/PensumGraph";
import { ReactFlowProvider } from "@xyflow/react";

export const Route = createFileRoute("/dashboard/pensum")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useCoursesInfo();
  const [hideApproved, setHideApproved] = useState(true);
  const [hideRegistered, setHideRegistered] = useState(true);
  const [grahpView, setGraphView] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div className="max-w-8xl container mx-auto flex h-full flex-col py-8">
      <h1 className="mb-4 text-3xl font-bold">Pensum de Estudio</h1>

      <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row">
        <Toggle
          variant="outline"
          pressed={hideApproved}
          onPressedChange={(v) => setHideApproved(v)}
        >
          {hideApproved ? "Mostrar aprobadas" : "Ocultar aprobadas"}
          {hideApproved ? <Eye /> : <EyeOff />}
        </Toggle>
        <Toggle
          variant="outline"
          pressed={hideRegistered}
          onPressedChange={(v) => setHideRegistered(v)}
        >
          {hideRegistered ? "Mostrar inscritas" : "Ocultar inscritas"}
          {hideRegistered ? <Eye /> : <EyeOff />}
        </Toggle>

        <Toggle
          variant="outline"
          pressed={grahpView}
          onPressedChange={(v) => setGraphView(v)}
        >
          {grahpView ? "Vista de tabla" : "Vista de grafo"}
          {grahpView ? <Table2 /> : <Workflow />}
        </Toggle>
      </div>

      {grahpView ? (
        <ReactFlowProvider>
          <PensumGraph
            courses={data.courses}
            hideRegistered={hideRegistered}
            hideApproved={hideApproved}
          />
        </ReactFlowProvider>
      ) : (
        <PensumTable
          courses={data.courses}
          hideRegistered={hideRegistered}
          hideApproved={hideApproved}
        />
      )}
    </div>
  );
}
