import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import {
  getRegistrationPayments,
  registerPayment,
} from "@/services/registration";
import { Badge } from "@/components/ui/badge";
import useUserInfo from "@/hooks/useUserInfo";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/payment")({
  component: RouteComponent,
});

const formSchema = z.object({
  bank: z.string(),
  deposit: z
    .string()
    .length(6, "Debe ingresar los 6 ultimos dígitos del depósito"),
  ciType: z.string(),
  ci: z.string().min(1, "Debe ingresar la cédula del titular"),
});

function RouteComponent() {
  const { data: student } = useUserInfo();

  const { data, isLoading, mutate } = useSWR(
    "payment-info",
    getRegistrationPayments,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "02",
      ciType: "V",
      deposit: "",
      ci: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!student) {
      return;
    }

    form.reset();

    const { success } = await registerPayment({
      ...values,
      studentCi: student.personalData.ci,
    });

    if (success) {
      toast.success("Pago registrado");
    } else {
      toast.error("Error al registrar el pago");
    }

    await mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  const currentAmount = data.movements.reduce(
    (prev, current) => prev + (current.credit - current.debit),
    0,
  );

  return (
    <div className="@container py-8 container mx-auto max-w-6xl h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Registro de Depósito</h1>
      <div className="grid grid-cols-1 @4xl:grid-cols-2 gap-4">
        <Card className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 p-8"
              autoComplete="off"
            >
              <h2 className="text-xl font-bold">Registrar depósito</h2>

              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="02">Venezuela</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Deposito</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="123456"
                        {...field}
                        onChange={(e) => {
                          if (e.target.value.length > 6) return;

                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Últimos 6 dígitos del número de referencia
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-start gap-4 w-full">
                <FormField
                  control={form.control}
                  name="ciType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Persona</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger defaultValue="v">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="V">V</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                          <SelectItem value="J">J</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ci"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cédula</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="08111222"
                          className="flex-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button type="submit">Registrar</Button>
                {form.formState.errors.root ? (
                  <p className="text-red-500 text-sm text-center">
                    {form.formState.errors.root.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Form>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-bold">Depósitos Registrados</h2>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-100">
                <TableRow>
                  <TableHead className="text-center">Fecha</TableHead>
                  <TableHead className="text-center">Depósito</TableHead>
                  <TableHead className="text-center">Banco</TableHead>
                  <TableHead className="text-center">Monto</TableHead>
                  <TableHead className="text-center">Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payments.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">{p.date}</TableCell>
                    <TableCell className="text-center">{p.number}</TableCell>
                    <TableCell className="text-center">{p.bank}</TableCell>
                    <TableCell className="text-center">{p.amount}</TableCell>
                    <TableCell className="text-center">
                      {p.status === "VáLIDO" ? (
                        <Badge className="bg-green-200 text-gren-900">
                          VÁLIDO
                        </Badge>
                      ) : p.status === "POR VALIDAR" ? (
                        <Badge className="bg-cobalt-200 text-cobalt-900">
                          POR VALIDAR
                        </Badge>
                      ) : (
                        <Badge className="bg-red-200 text-red-900">
                          NO VÁLIDO
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-8 @4xl:col-span-2">
          <h2 className="text-xl font-bold">Estado de Cuenta</h2>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-100">
                <TableRow>
                  <TableHead className="text-center">Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-center">
                    Nro de Documento
                  </TableHead>
                  <TableHead className="text-center">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.movements.map((p, i) => {
                  const amount = p.credit - p.debit;

                  return (
                    <TableRow key={i}>
                      <TableCell className="text-center">{p.date}</TableCell>
                      <TableCell>{p.description}</TableCell>
                      <TableCell className="text-center">{p.number}</TableCell>
                      <TableCell className="text-center">{amount}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-zinc-100">
                  <TableCell className="text-center" colSpan={3}>
                    Saldo actual
                  </TableCell>
                  <TableCell className="text-center">{currentAmount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
