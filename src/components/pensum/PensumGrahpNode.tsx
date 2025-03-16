import { Handle, Position } from "@xyflow/react";
import { Course } from "@/types/course";
import { Book } from "lucide-react";
import { Badge } from "../ui/badge";
import { semesterWithSuffix } from "@/utils/course";
import useCoursesInfo from "@/hooks/useCoursesInfo";

interface Props {
  data: Course;
}

export default function PensumGraphNode({ data }: Props) {
  const { isRegistered, isApproved } = useCoursesInfo();

  const approved = isApproved(data.id);
  const registered = isRegistered(data.id);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id={data.id}
        className="opacity-0"
      />
      <div className="border p-4 bg-white flex flex-col gap-4 rounded-md">
        <div className="flex items-center gap-4">
          <div className="h-8 aspect-square rounded-md bg-cobalt-100 flex items-center justify-center">
            <Book className="size-4 text-cobalt-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{data.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-cobalt-100 text-cobalt-900">{data.id}</Badge>

          {data.semester ? (
            <Badge className="bg-cobalt-100 text-cobalt-900">
              {semesterWithSuffix(data.semester)}
            </Badge>
          ) : null}

          <Badge className="bg-cobalt-100 text-cobalt-900">{data.uc}uc</Badge>
          {approved ? (
            <Badge className="bg-green-200 text-gren-900">Aprobada</Badge>
          ) : registered ? (
            <Badge className="bg-cobalt-200 text-cobalt-900">Inscrita</Badge>
          ) : (
            <Badge className="bg-red-200 text-red-900">Pendiente</Badge>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={data.id}
        className="opacity-0"
      />
    </>
  );
}
