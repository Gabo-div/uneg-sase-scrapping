import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCoursesInfo from "@/hooks/useCoursesInfo";
import { Course } from "@/types/course";
import PensumTableRow from "./PensumTableRow";
import { Fragment } from "react";

interface Props {
  courses: Course[];
  hideApproved: boolean;
  hideRegistered: boolean;
}

export default function PensumTable({
  courses,
  hideApproved,
  hideRegistered,
}: Props) {
  const { isApproved, isRegistered } = useCoursesInfo();

  const groupped = Object.groupBy(courses, (item) => item.semester || 0);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-zinc-100 dark:bg-zinc-900">
            <TableRow>
              <TableHead className="w-24 text-center">Código</TableHead>
              <TableHead>Asignatura</TableHead>
              <TableHead className="text-center">Semestre</TableHead>
              <TableHead className="text-center">UC</TableHead>
              <TableHead className="text-center">Prelación</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupped).map(([key, value]) => {
              if (!value || key === "0") {
                return null;
              }

              const totalUC = value.reduce((acc, item) => acc + item.uc, 0);

              const courses = value.filter((i) => {
                if (hideApproved && isApproved(i.id)) {
                  return false;
                }

                if (hideRegistered && isRegistered(i.id)) {
                  return false;
                }

                return true;
              });

              if (!courses.length) {
                return null;
              }

              return (
                <Fragment key={key}>
                  {courses.map((item) => (
                    <PensumTableRow key={item.id} course={item} />
                  ))}
                  <TableRow className="bg-zinc-100 dark:bg-zinc-900">
                    <TableCell colSpan={3}>
                      <div className="flex flex-1 justify-center">
                        <span className="font-bold">Semester {key}</span>
                      </div>
                    </TableCell>
                    <TableCell colSpan={1} className="text-center">
                      {totalUC}
                    </TableCell>
                    <TableCell colSpan={2} className="text-center"></TableCell>
                  </TableRow>
                </Fragment>
              );
            })}

            {groupped["0"] &&
              groupped["0"]
                .filter((i) => {
                  if (hideApproved && isApproved(i.id)) {
                    return false;
                  }

                  if (hideRegistered && isRegistered(i.id)) {
                    return false;
                  }

                  return true;
                })
                .map((item) => <PensumTableRow key={item.id} course={item} />)}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
