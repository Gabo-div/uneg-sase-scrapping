import { getUserInfo } from "@/actions/user";
import useSWR from "swr";

export default function useUserInfo() {
  const { data, error, isLoading } = useSWR("user-info", getUserInfo);

  return { data, isLoading, error };
}
