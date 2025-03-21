import { getInfoCourses } from "@/actions/courses";
import useSWR from "swr";

export default function useCoursesInfo() {
  const { data, error, isLoading } = useSWR("courses-info", getInfoCourses);

  const isApproved = (courseId: string) => {
    if (!data) {
      return null;
    }

    return data.approved.some((item) => item.courseId === courseId);
  };

  const isRegistered = (courseId: string) => {
    if (!data) {
      return null;
    }

    return data.registered.some((item) => item.courseId === courseId);
  };

  const findCourse = (courseId: string) => {
    if (!data) {
      return null;
    }

    const course = data.courses.find((item) => item.id === courseId);

    if (!course) {
      return null;
    }

    return course;
  };

  return { data, isLoading, error, isApproved, isRegistered, findCourse };
}
