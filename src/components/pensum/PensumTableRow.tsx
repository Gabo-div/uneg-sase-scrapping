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
          <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
            <Book className="size-4 text-cobalt-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{item.name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {item.semester ? (
          <Badge className="bg-cobalt-100 text-cobalt-900">
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
                      <div>
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
          <Badge className="bg-green-200 text-gren-900">Aprobada</Badge>
        ) : registered ? (
          <Badge className="bg-cobalt-200 text-cobalt-900">Inscrita</Badge>
        ) : (
          <Badge className="bg-red-200 text-red-900">Pendiente</Badge>
        )}
      </TableCell>
    </TableRow>
  );
}
