import { Course } from "@/types/course";
import {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useState } from "react";
import PensumGraphNode from "./PensumGrahpNode";
import useCoursesInfo from "@/hooks/useCoursesInfo";
import { useTheme } from "next-themes";

interface Props {
  courses: Course[];
  hideApproved: boolean;
  hideRegistered: boolean;
}

export default function PensumGraph({
  courses,
  hideApproved,
  hideRegistered,
}: Props) {
  const { isApproved, isRegistered } = useCoursesInfo();

  const { fitView } = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const filtered = courses.filter((c) => {
      if (hideRegistered && isRegistered(c.id)) {
        return false;
      }

      if (hideApproved && isApproved(c.id)) {
        return false;
      }
      return true;
    });

    let lastSemester = 0;

    filtered.forEach((c) => {
      if (c.semester && c.semester >= lastSemester) {
        lastSemester = c.semester;
      }
    });

    const grouped = Object.values(
      Object.groupBy(filtered, (c) => c.semester || lastSemester + 1),
    ).filter((c) => !!c);

    const newNodes = grouped
      .map((semester, i) =>
        semester.map((course, j) => ({
          id: course.id,
          position: { x: j * 400, y: i * 300 },
          data: course,
          type: "courseNode",
        })),
      )
      .flat();

    const newEdges = filtered
      .map((course) =>
        course.required.map((required) => ({
          id: `${required}-${course.id}`,
          source: required,
          target: course.id,
          type: "simplebezier",
        })),
      )
      .flat();

    setNodes(newNodes);
    setEdges(newEdges);

    window.requestAnimationFrame(() => fitView());

    // eslint-disable-next-line
  }, [courses, hideApproved, hideRegistered]);

  const nodeTypes = useMemo(() => ({ courseNode: PensumGraphNode }), []);

  const { theme } = useTheme();

  return (
    <div className="flex-1 overflow-hidden rounded-md border">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        nodesConnectable={false}
        nodesDraggable={false}
        minZoom={0.3}
        colorMode={theme as "dark" | "light" | "system"}
      >
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
