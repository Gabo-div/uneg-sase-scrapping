import {
  createFileRoute,
  Outlet,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Book,
  Calendar,
  ChevronsUpDown,
  File,
  GraduationCap,
  List,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import Logo from "@/assets/uneg-logo.png";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserInfo from "@/hooks/useUserInfo";
import { useTheme } from "@/components/ThemeProvider";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!sessionStorage.getItem("sipId") || !sessionStorage.getItem("saseId")) {
      throw redirect({
        to: "/",
      });
    }
  },
});

const data = [
  {
    title: "Consultas",
    items: [
      {
        title: "Datos del estudiante",
        url: "/dashboard/student",
        icon: GraduationCap,
      },
      {
        title: "Resumen de Asignaturas",
        url: "/dashboard/courses",
        icon: List,
      },
      {
        title: "Pensum",
        url: "/dashboard/pensum",
        icon: Book,
      },
      {
        title: "Constancia de Estudio",
        url: "/dashboard/certificate",
        icon: File,
        disabled: true,
      },
    ],
  },
  {
    title: "Evaluación Docente",
    items: [
      {
        title: "Docentes",
        url: "/dashboard/teachers",
        icon: Users,
      },
    ],
  },

  {
    title: "Inscripción",
    items: [
      {
        title: "Cronograma",
        url: "/dashboard/schedule",
        icon: Calendar,
      },
      {
        title: "Registro de pago",
        url: "/dashboard/payment",
        icon: Wallet,
      },
    ],
  },
];

function RouteComponent() {
  const navigate = useNavigate();
  const { data: student } = useUserInfo();
  const { setTheme } = useTheme();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="dark:bg-background h-16 border-b bg-white">
          <div className="flex h-full w-full items-center gap-3 px-2">
            <img src={Logo} className="size-9 dark:grayscale dark:invert" />
            <div className="flex flex-col leading-tight">
              <h1 className="text-primary text-3xl font-black">UNEG</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="dark:bg-background bg-white">
          {data.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Link to={item.url} disabled={item.disabled}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            size="lg"
                            className={twMerge(
                              "hover:bg-cobalt-50 dark:hover:bg-zinc-900",
                              isActive && "bg-cobalt-50 dark:bg-zinc-900",
                            )}
                            disabled={item.disabled}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={twMerge(
                                  "rounded-md p-2 transition-all",
                                  isActive &&
                                    "bg-cobalt-900 text-white dark:bg-zinc-800",
                                )}
                              >
                                <item.icon className="size-4" />
                              </div>
                              <span
                                className={twMerge(
                                  isActive &&
                                    "text-cobalt-900 font-bold dark:text-white",
                                )}
                              >
                                {item.title}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        )}
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <Separator />
        <SidebarFooter className="dark:bg-background bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {student?.personalData.names}{" "}
                    {student?.personalData.surnames}
                  </span>
                  <span className="truncate text-xs">
                    {student?.academicData.career}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem>
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      Cambiar Tema
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun />
                      Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon />
                      Oscuro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Monitor />
                      Sistema
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  sessionStorage.removeItem("sipId");
                  sessionStorage.removeItem("saseId");
                  navigate({ to: "/" });
                }}
              >
                <LogOut />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <h2 className="hidden font-semibold md:block">
              Sistema de Apoyo a los Servicios Estudiantiles
            </h2>
            <div className="ml-auto">
              <StatusBadge />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
