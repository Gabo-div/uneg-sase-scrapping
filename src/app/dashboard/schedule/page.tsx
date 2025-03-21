"use client";

import { Card } from "@/components/ui/card";
import { getRegistrationSchedule } from "@/actions/registration";
import { ArrowUpLeft, Calendar, Clock, Info, PlusCircle } from "lucide-react";
import useSWR from "swr";

export default function RouteComponent() {
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
    <div className="@container container mx-auto flex h-full max-w-4xl flex-col py-8">
      <h1 className="mb-4 text-3xl font-bold">Cronograma de Inscripción</h1>
      <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2">
        <Card className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <h2 className="text-lg font-bold">Fecha</h2>
          </div>
          <span>{data.date}</span>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <h2 className="text-lg font-bold">Hora</h2>
          </div>
          <span>{data.time}</span>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-4">
            <ArrowUpLeft className="size-5" />
            <h2 className="text-lg font-bold">Retiros</h2>
          </div>
          <span>{data.withdraw}</span>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-4">
            <PlusCircle className="size-5" />
            <h2 className="text-lg font-bold">Adiciones y Cambios</h2>
          </div>
          <span>{data.changes}</span>
        </Card>
        <Card className="flex flex-col gap-2 bg-red-50 p-6 @lg:col-span-2 dark:bg-red-950/50">
          <div className="flex items-center gap-4">
            <Info className="size-5 text-red-500 dark:text-red-300" />
            <h2 className="text-lg font-bold text-red-500 dark:text-red-300">
              Información importante
            </h2>
          </div>
          {data.warning}
          <span></span>
          <span className="font-bold text-red-500 dark:text-red-300">
            {data.warning2}
          </span>
        </Card>
      </div>
    </div>
  );
}
