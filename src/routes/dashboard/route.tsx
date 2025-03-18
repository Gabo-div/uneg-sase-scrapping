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
  File,
  GraduationCap,
  List,
  LogOut,
  Users,
  Wallet,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/uneg-logo.png";
import { Separator } from "@/components/ui/separator";

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

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-white border-b h-16">
          <div className="flex items-center w-full h-full gap-3 px-2">
            <img src={Logo} className="size-9" />
            <div className="flex flex-col leading-tight">
              <h1 className="font-black text-3xl text-primary">UNEG</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-white">
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
                              "hover:bg-cobalt-50",
                              isActive && "bg-cobalt-50",
                            )}
                            disabled={item.disabled}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={twMerge(
                                  "p-2 rounded-md transition-all",
                                  isActive && "bg-cobalt-900 text-white",
                                )}
                              >
                                <item.icon className="size-4" />
                              </div>
                              <span
                                className={twMerge(
                                  isActive && "text-cobalt-900 font-bold",
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
        <SidebarFooter className="bg-white">
          <Button
            onClick={() => {
              sessionStorage.removeItem("sipId");
              sessionStorage.removeItem("saseId");
              navigate({ to: "/" });
            }}
          >
            Cerrar Sesión
            <LogOut />
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <h2 className="hidden md:block font-semibold">
              Sistema de Apoyo a los Servicios Estudiantiles
            </h2>
          </div>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
