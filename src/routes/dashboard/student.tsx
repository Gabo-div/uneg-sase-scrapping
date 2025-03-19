import { createFileRoute } from "@tanstack/react-router";
import useUserInfo from "@/hooks/useUserInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  User,
  Award,
  Clock,
  Building,
  Flag,
  Home,
  BarChart3,
} from "lucide-react";
import useCoursesInfo from "@/hooks/useCoursesInfo";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/student")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useUserInfo();
  const { data: courses } = useCoursesInfo();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!courses || !data) {
      return;
    }

    let totalUC = 0;

    courses.courses.forEach((c) => (totalUC += c.uc));

    setProgress(Math.round((data.personalData.approvedUC / totalUC) * 100));
  }, [courses, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  const fullName = `${data.personalData.names} ${data.personalData.surnames}`;

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <Card className="border-primary/20 overflow-hidden">
        <CardContent className="relative z-10 pt-6 pb-4">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{fullName}</h2>
                <p className="text-muted-foreground">
                  {data.personalData.career}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-cobalt-100 text-cobalt-800 border-cobalt-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {data.personalData.status}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-cobalt-100 text-cobalt-800 border-cobalt-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  Nivel {data.personalData.level}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-cobalt-100 text-cobalt-800 border-cobalt-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  Índice: {data.personalData.academicIndex}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <span>C.I: {data.personalData.ci}</span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="text-muted-foreground h-4 w-4" />
                  <span>Expediente: {data.personalData.record}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span className="truncate">
                    {data.personalData.academicEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="text-muted-foreground h-4 w-4" />
                  <span>Sede: {data.personalData.campus}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg p-4 md:self-center">
              <div className="text-center">
                <span className="text-primary text-3xl font-bold">
                  {progress}%
                </span>
                <p className="text-muted-foreground text-xs">
                  Avance de Carrera
                </p>
              </div>
              <Progress value={progress} className="h-2 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="text-primary h-5 w-5" />
            Progreso Académico
          </CardTitle>
          <CardDescription>
            Resumen del rendimiento académico del estudiante
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4" /> UNIDADES DE CRÉDITO
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold">
                    {data.academicData.coursedUC}
                  </div>
                  <div className="text-muted-foreground text-xs">Cursadas</div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold">
                    {data.academicData.approvedUC}
                  </div>
                  <div className="text-muted-foreground text-xs">Aprobadas</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                <BarChart3 className="h-4 w-4" /> ÍNDICES ACADÉMICOS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold">
                    {data.academicData.academicIndex}
                  </div>
                  <div className="text-muted-foreground text-xs">Académico</div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold">
                    {data.academicData.lastIndex}
                  </div>
                  <div className="text-muted-foreground text-xs">Último</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-4 w-4" /> INFORMACIÓN DE SEMESTRE
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-muted-foreground text-xs">
                    Primer Semestre
                  </div>
                  <div className="font-medium">
                    {data.academicData.firstSemester}
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-muted-foreground text-xs">
                    Último Semestre
                  </div>
                  <div className="font-medium">
                    {data.academicData.lastSemester}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <Award className="h-4 w-4" /> DETALLES ACADÉMICOS
              </h3>
              <div className="space-y-2 text-sm">
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Pensum</span>
                  <span className="font-medium">
                    {data.academicData.pensum}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">UC Tecnológicas</span>
                  <span className="font-medium">
                    {data.academicData.technologicalUC}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    UC Profesionales
                  </span>
                  <span className="font-medium">
                    {data.academicData.profesionalUC}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Índice Tecnológico
                  </span>
                  <span className="font-medium">
                    {data.academicData.technologicalIndex}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4" /> HISTORIAL ADMINISTRATIVO
              </h3>
              <div className="space-y-2 text-sm">
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Fecha de Registro
                  </span>
                  <span className="font-medium">
                    {data.academicData.registrationDate}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Origen de Registro
                  </span>
                  <span className="font-medium">
                    {data.academicData.registrationOrigin}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Registrado por</span>
                  <span className="font-medium">
                    {data.academicData.registeredBy}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Régimen de Repitencia
                  </span>
                  <span className="font-medium">
                    {data.academicData.repeatsRegimen}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="text-primary h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Datos personales y de contacto del estudiante
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <User className="h-4 w-4" /> DATOS PERSONALES
              </h3>
              <div className="space-y-2 text-sm">
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Fecha de Nacimiento
                  </span>
                  <span className="font-medium">
                    {data.personalData.birthdate}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Lugar de Nacimiento
                  </span>
                  <span className="font-medium">
                    {data.personalData.birthplace}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Género</span>
                  <span className="font-medium">{data.personalData.genre}</span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Estado Civil</span>
                  <span className="font-medium">
                    {data.personalData.maritalStatus}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <Phone className="h-4 w-4" /> INFORMACIÓN DE CONTACTO
              </h3>
              <div className="space-y-2 text-sm">
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Teléfono Principal
                  </span>
                  <span className="font-medium">
                    {data.personalData.phoneNumber}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">
                    Teléfono Alternativo
                  </span>
                  <span className="font-medium">
                    {data.personalData.alternativePhoneNumber}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Email Académico</span>
                  <span className="truncate font-medium">
                    {data.personalData.academicEmail}
                  </span>
                </div>
                <div className="border-muted/50 flex justify-between border-b py-1">
                  <span className="text-muted-foreground">Email Personal</span>
                  <span className="truncate font-medium">
                    {data.personalData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4" /> UBICACIÓN
            </h3>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-muted-foreground text-xs">País</div>
                <div className="flex items-center gap-1 font-medium">
                  <Flag className="h-3.5 w-3.5" />
                  {data.personalData.country}
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-muted-foreground text-xs">Estado</div>
                <div className="font-medium">{data.personalData.state}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-muted-foreground text-xs">Campus</div>
                <div className="font-medium">{data.personalData.campus}</div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="text-muted-foreground mb-1 text-xs">
                Dirección
              </div>
              <div className="flex items-start gap-2 font-medium">
                <Home className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                <span>{data.personalData.address}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
