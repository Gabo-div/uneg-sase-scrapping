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
    <div className="container mx-auto flex h-full max-w-6xl flex-col py-8">
      <h1 className="mb-4 text-3xl font-bold">Docentes</h1>

      <div className="space-y-4">
        {teachers.map((teacher) => {
          const course = findCourse(teacher.courseId) as Course;

          if (!course) {
            return null;
          }

          return (
            <Card key={teacher.ci} className="gap-2 p-8">
              <h2 className="font-bold">{teacher.name}</h2>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
                {teacher.ci}
              </span>

              <div className="flex items-center gap-2">
                <div className="bg-cobalt-100 flex aspect-square h-8 items-center justify-center rounded-md dark:bg-zinc-800">
                  <Book className="text-cobalt-900 size-4 dark:text-zinc-100" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                    {course.name}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
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
