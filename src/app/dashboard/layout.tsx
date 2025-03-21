import DashboardSidebar from "@/components/DashboardSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStorage = await cookies();

  if (!cookiesStorage.has("sipId") || !cookiesStorage.has("saseId")) {
    redirect("/");
  }

  return <DashboardSidebar>{children}</DashboardSidebar>;
}
