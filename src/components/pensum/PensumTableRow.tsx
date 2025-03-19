import useCoursesInfo from "@/hooks/useCoursesInfo";
import { Course } from "@/types/course";
import { TableCell, TableRow } from "../ui/table";
import { Book, Info } from "lucide-react";
import { semesterWithSuffix } from "@/utils/course";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { Badge } from "../ui/badge";

interface Props {
  course: Course;
}

export default function PensumTableRow({ course: item }: Props) {
  const { data, isRegistered, isApproved, findCourse } = useCoursesInfo();

  if (!data) {
    return null;
  }

  const approved = isApproved(item.id);
  const registered = isRegistered(item.id);

  return (
    <TableRow className="border-b-muted">
      <TableCell className="text-center">{item.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="bg-cobalt-100 flex aspect-square h-8 items-center justify-center rounded-md dark:bg-zinc-800">
            <Book className="text-cobalt-900 size-4 dark:text-zinc-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{item.name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {item.semester ? (
          <Badge className="bg-cobalt-100 text-cobalt-900 dark:bg-zinc-800 dark:text-zinc-100">
            {semesterWithSuffix(item.semester)}
          </Badge>
        ) : null}
      </TableCell>
      <TableCell className="text-center">{item.uc}</TableCell>
      <TableCell className="text-center">
        {item.required.length || item.semesterRequired ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="link">
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-4">
                <div className="flex flex-col gap-4">
                  {item.required.map((i) => {
                    const course = findCourse(i) as Course;
                    const approved = isApproved(i);

                    return (
                      <div key={i}>
                        <span
                          className={twMerge(
                            "font-vold",
                            approved && "line-through",
                          )}
                        >
                          {course.name}
                        </span>
                      </div>
                    );
                  })}

                  {item.semesterRequired ? (
                    <div>
                      <span className="font-vold">
                        {semesterWithSuffix(item.semesterRequired)} semestre
                        aprovado
                      </span>
                    </div>
                  ) : null}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </TableCell>
      <TableCell className="text-center">
        {approved ? (
          <Badge className="text-gren-900 bg-green-200 dark:bg-green-950 dark:text-green-100">
            Aprobada
          </Badge>
        ) : registered ? (
          <Badge className="bg-cobalt-200 text-cobalt-9000 dark:bg-cobalt-950 dark:text-cobalt-100">
            Inscrita
          </Badge>
        ) : (
          <Badge className="bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-100">
            Pendiente
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
}
