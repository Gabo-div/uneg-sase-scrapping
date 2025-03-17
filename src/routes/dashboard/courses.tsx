import useCoursesInfo from "@/hooks/useCoursesInfo";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "@/types/course";
import { Book } from "lucide-react";
import { semesterWithSuffix } from "@/utils/course";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/courses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useCoursesInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  const findCourse = (courseId: string): Course => {
    const course = data.courses.find((item) => item.id === courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  };

  return (
    <div className="py-8 container mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Resumen de Asignaturas</h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center bg-cobalt-900 text-cobalt-50 px-4 py-6 gap-4">
            <h2 className="text-xl font-bold">Asignaturas Inscritas</h2>
          </div>
          <Table>
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead className="w-24 text-center">Código</TableHead>
                <TableHead>Asignatura</TableHead>
                <TableHead className="text-center">Semestre</TableHead>
                <TableHead className="text-center">UC</TableHead>
                <TableHead>Profesor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.registered.map((item) => {
                const course = findCourse(item.courseId);

                return (
                  <TableRow key={item.courseId} className="border-b-muted py-2">
                    <TableCell className="text-center">
                      {item.courseId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 py-2">
                        <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
                          <Book className="size-4 text-cobalt-900" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{course.name}</span>
                          <span className="text-zinc-600">
                            Sección {item.section}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {course.semester ? (
                        <Badge className="bg-cobalt-100 text-cobalt-900">
                          {semesterWithSuffix(course.semester)}
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-center">{course.uc}</TableCell>
                    <TableCell>{item.teacherName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center bg-cobalt-900 text-cobalt-50 px-4 py-6 gap-4">
            <h2 className="text-xl font-bold">Asignaturas Aprobadas</h2>
          </div>
          <Table>
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead className="w-24 text-center">Código</TableHead>
                <TableHead>Asignatura</TableHead>
                <TableHead className="text-center">Semestre</TableHead>
                <TableHead className="text-center">UC</TableHead>
                <TableHead className="text-center">Nota</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.approved.map((item) => {
                const course = findCourse(item.courseId);

                return (
                  <TableRow key={item.courseId} className="border-b-muted py-2">
                    <TableCell className="text-center">
                      {item.courseId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 py-2">
                        <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
                          <Book className="size-4 text-cobalt-900" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{course.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {course.semester ? (
                        <Badge className="bg-cobalt-100 text-cobalt-900">
                          {semesterWithSuffix(course.semester)}
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-center">{course.uc}</TableCell>
                    <TableCell className="text-center">
                      {item.calification}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center bg-cobalt-900 text-cobalt-50 px-4 py-6 gap-4">
            <h2 className="text-xl font-bold">Asignaturas Reprobadas</h2>
          </div>
          <Table>
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead className="w-24 text-center">Código</TableHead>
                <TableHead>Asignatura</TableHead>
                <TableHead className="text-center">Semestre</TableHead>
                <TableHead className="text-center">UC</TableHead>
                <TableHead className="text-center">No. Veces</TableHead>
                <TableHead className="text-center">Pendiente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.disapproved.map((item) => {
                const course = findCourse(item.courseId);

                return (
                  <TableRow key={item.courseId} className="border-b-muted py-2">
                    <TableCell className="text-center">
                      {item.courseId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 py-2">
                        <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
                          <Book className="size-4 text-cobalt-900" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{course.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {course.semester ? (
                        <Badge className="bg-cobalt-100 text-cobalt-900">
                          {semesterWithSuffix(course.semester)}
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-center">{course.uc}</TableCell>
                    <TableCell className="text-center">{item.times}</TableCell>
                    <TableCell className="text-center">
                      {item.pending ? "SI" : "NO"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
