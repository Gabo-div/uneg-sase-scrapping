import { SIPApi } from "@/lib/api";
import { Movement, Payment } from "@/types/payment";
import { load } from "cheerio";

export const getRegistrationSchedule = async () => {
  const res = await SIPApi.get(
    "https://servicio.uneg.edu.ve/inscripcion/inscripcion/informacion.php",
  ).text();

  const $ = load(res);

  const $td = $("td");

  const date = $($td[15]).text().replace("Fecha: ", "").trim();
  const time = $($td[16]).text().replace("Hora: ", "").trim();
  const warning = $($td[17]).text();
  const warning2 = $($td[18]).text();
  const withdraw = $($td[20]).text();
  const changes = $($td[22]).text();

  return { date, time, warning, warning2, withdraw, changes };
};

export const getRegistrationPayments = async () => {
  const res = await SIPApi.get(
    "https://servicio.uneg.edu.ve/inscripcion/inscripcion/sce800p.php",
  ).text();

  const $ = load(res);

  const $registered = $($("table")[5]);

  const payments: Payment[] = [];

  $registered.find("tr").map((i, el) => {
    if (i === 0 || i === 1) return;

    const $row = $(el);

    let date: string | null = null;
    let number: number | null = null;
    let bank: string | null = null;
    let amount: string | null = null;
    let status: string | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        date = text;
      }

      if (j === 1) {
        number = Number(text);
      }

      if (j === 2) {
        bank = text;
      }

      if (j === 3) {
        amount = text;
      }

      if (j === 4) {
        status = text;
      }
    });

    if (date && number && bank && amount && status) {
      payments.push({ date, number, bank, amount, status });
    }
  });

  const $movements = $($("table")[6]);

  const movements: Movement[] = [];

  $movements.find("tr").map((i, el) => {
    if (i === 0 || i === 1) return;

    const $row = $(el);

    let date: string | null = null;
    let description: string | null = null;
    let number: string | null = null;
    let debit: number | null = null;
    let credit: number | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        if (text === "TOTALES") {
          return;
        }

        date = text;
      }

      if (j === 1) {
        description = text;
      }

      if (j === 2) {
        number = text;
      }

      if (j === 3) {
        debit = Number(text);
      }

      if (j === 4) {
        credit = Number(text);
      }
    });

    if (date && description && number) {
      movements.push({
        date,
        description,
        number,
        debit: debit || 0,
        credit: credit || 0,
      });
    }
  });

  return { payments, movements };
};

export const registerPayment = async (data: {
  studentCi: string;
  bank: string;
  deposit: string;
  ciType: string;
  ci: string;
}) => {
  const formData = new FormData();

  formData.append("PHPSESSID", sessionStorage.getItem("sipId") as string);
  formData.append("apb_state_", "POST");
  formData.append("apb_condicion", "");
  formData.append("apb_cedula", data.studentCi);
  formData.append("apb_cod_carr", "");
  formData.append("apb_sede", "");
  formData.append("apb_cod_banco", data.bank);
  formData.append("apb_voucher", data.deposit);
  formData.append("nac_titular", data.ciType);
  formData.append("ced_titular", data.ci);
  formData.append("apb_lapso", "");

  const res = await SIPApi.post(
    "https://servicio.uneg.edu.ve/inscripcion/inscripcion/sce800p.php",
    { body: formData },
  ).text();

  return {
    success: res.includes(data.deposit),
  };
};
