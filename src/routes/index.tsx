import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import Logo from "@/assets/uneg-logo.png";

export const Route = createFileRoute("/")({
  component: App,
});

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

function App() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { sessionId } = await login(values);
    sessionStorage.setItem("sessionId", sessionId);
    navigate({
      to: "/dashboard",
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary">
      <Card className="container max-w-md p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 p-8 py-18"
            autoComplete="off"
          >
            <div className="flex flex-col items-center gap-4">
              <img src={Logo} className="size-20" />
              <h1 className="font-bold text-center">
                Sistema de Apoyo a los Servicios Estudiantiles
              </h1>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Ingresar</Button>

            <div className="w-full items-center flex flex-col">
              <p className="text-sm">
                Este sistema no es oficial de la UNEG. No recopilamos ningun
                tipo de información. Todo el código fuente esta disponible en el{" "}
                <a
                  href="https://github.com/Gabo-div/uneg-sase-scrapping"
                  className="text-cobalt-500 hover:underline"
                  target="_blank"
                  rel="noopener"
                >
                  repositorio de github.
                </a>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
