import { getTeachers } from "@/services/teachers";
import useSWR from "swr";

export default function useTeachersInfo() {
  return useSWR("teachers-info", getTeachers);
}
