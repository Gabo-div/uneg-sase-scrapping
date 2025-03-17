import { Card } from "@/components/ui/card";
import useCoursesInfo from "@/hooks/useCoursesInfo";
import useTeachersInfo from "@/hooks/useTeachersInfo";
import { Course } from "@/types/course";
import { createFileRoute } from "@tanstack/react-router";
import { Book } from "lucide-react";

export const Route = createFileRoute("/dashboard/teachers")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: teachers, isLoading } = useTeachersInfo();
  const { findCourse } = useCoursesInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!teachers) {
    return <div>Error</div>;
  }

  return (
    <div className="py-8 container mx-auto max-w-6xl h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Docentes</h1>

      <div className="space-y-4">
        {teachers.map((teacher) => {
          const course = findCourse(teacher.courseId) as Course;

          if (!course) {
            return null;
          }

          return (
            <Card key={teacher.ci} className="p-8 gap-2">
              <h2 className="font-bold">{teacher.name}</h2>
              <span className="font-medium text-sm text-zinc-700">
                {teacher.ci}
              </span>

              <div className="flex items-center gap-2">
                <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
                  <Book className="size-4 text-cobalt-900" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-500 text-sm">
                    {course.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    Sección {teacher.courseSection}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
