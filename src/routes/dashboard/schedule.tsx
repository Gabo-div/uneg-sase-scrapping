import { Card } from "@/components/ui/card";
import { getRegistrationSchedule } from "@/services/registration";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpLeft, Calendar, Clock, Info, PlusCircle } from "lucide-react";
import useSWR from "swr";

export const Route = createFileRoute("/dashboard/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useSWR(
    "registration-schedule",
    getRegistrationSchedule,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div className="@container py-8 container mx-auto max-w-4xl h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Cronograma de Inscripción</h1>
      <div className="grid grid-cols-1 @lg:grid-cols-2 gap-4">
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <h2 className="font-bold text-lg">Fecha</h2>
          </div>
          <span>{data.date}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <h2 className="font-bold text-lg">Hora</h2>
          </div>
          <span>{data.time}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <ArrowUpLeft className="size-5" />
            <h2 className="font-bold text-lg">Retiros</h2>
          </div>
          <span>{data.withdraw}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <PlusCircle className="size-5" />
            <h2 className="font-bold text-lg">Adiciones y Cambios</h2>
          </div>
          <span>{data.changes}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 @lg:col-span-2 bg-red-50">
          <div className="flex items-center gap-4">
            <Info className="size-5 text-red-500" />
            <h2 className="font-bold text-lg text-red-500">
              Información importante
            </h2>
          </div>
          {data.warning}
          <span></span>
          <span className="text-red-500 font-bold">{data.warning2}</span>
        </Card>
      </div>
    </div>
  );
}
