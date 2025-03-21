"use server";

import { api } from "@/lib/api";
import { load } from "cheerio";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SIPLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res1 = await api
    .get("https://servicio.uneg.edu.ve/inscripcion/principal/login.php")
    .text();
  const $ = load(res1);

  const sessionId = $("input[name=PHPSESSID]").attr("value");
  const code = $("img")[1].attribs["src"].split("=")[1];

  if (!sessionId || !code) {
    throw new Error();
  }

  const formData = new FormData();

  formData.append("PHPSESSID", sessionId);
  formData.append("apb_state_", "POST");
  formData.append("s_login", username);
  formData.append("s_password", password);
  formData.append("cryp", code);

  const res2 = await api
    .post("https://servicio.uneg.edu.ve/inscripcion/principal/login.php", {
      body: formData,
    })
    .text();

  const $2 = load(res2);

  const xyz0 = $2("input[name='xyz_mvg[0]']").attr("value");
  const xyz1 = $2("input[name='xyz_mvg[1]']").attr("value");
  const xyz2 = $2("input[name='xyz_mvg[2]']").attr("value");

  if (!xyz0 || !xyz1 || !xyz2) {
    throw new Error();
  }

  const formData2 = new FormData();

  formData2.append("PHPSESSID", sessionId);
  formData2.append("xyz_mvg[0]", xyz0);
  formData2.append("xyz_mvg[1]", xyz1);
  formData2.append("xyz_mvg[2]", xyz2);

  const res3 = await api
    .post("https://servicio.uneg.edu.ve/inscripcion/principal/redirect.php", {
      body: formData2,
    })
    .text();

  const $3 = load(res3);

  const text = $3.text();

  (await cookies()).set("sipId", sessionId);

  return {
    invalid: text.includes("Lo siento, Usted es un usuario no registrado"),
    blocked: text.includes(
      "Lo siento, Usted es un usuario con el password bloqueado",
    ),
  };
};

const SASELogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res1 = await api
    .get("https://servicio.uneg.edu.ve/sase/principal/login.php")
    .text();
  const $ = load(res1);

  const sessionId = $("input[name=PHPSESSID]").attr("value");
  const code = $("img")[1].attribs["src"].split("=")[1];

  if (!sessionId || !code) {
    throw new Error();
  }

  const formData = new FormData();

  formData.append("PHPSESSID", sessionId);
  formData.append("apb_state_", "POST");
  formData.append("s_login", username);
  formData.append("s_password", password);
  formData.append("cryp", code);

  const res2 = await api
    .post("https://servicio.uneg.edu.ve/sase/principal/login.php", {
      body: formData,
    })
    .text();

  const $2 = load(res2);

  const xyz0 = $2("input[name='xyz_mvg[0]']").attr("value");
  const xyz1 = $2("input[name='xyz_mvg[1]']").attr("value");
  const xyz2 = $2("input[name='xyz_mvg[2]']").attr("value");

  if (!xyz0 || !xyz1 || !xyz2) {
    throw new Error();
  }

  const formData2 = new FormData();

  formData2.append("PHPSESSID", sessionId);
  formData2.append("xyz_mvg[0]", xyz0);
  formData2.append("xyz_mvg[1]", xyz1);
  formData2.append("xyz_mvg[2]", xyz2);

  const res3 = await api
    .post("https://servicio.uneg.edu.ve/sase/principal/redirect.php", {
      body: formData2,
    })
    .text();

  const $3 = load(res3);

  const text = $3.text();

  (await cookies()).set("saseId", sessionId);

  return {
    invalid: text.includes("Lo siento, Usted es un usuario no registrado"),
    blocked: text.includes(
      "Lo siento, Usted es un usuario con el password bloqueado",
    ),
  };
};

export const login = async (data: { username: string; password: string }) => {
  const [sip, sase] = await Promise.all([SIPLogin(data), SASELogin(data)]);

  const invalid = sip.invalid || sase.invalid;
  const blocked = sip.blocked || sase.blocked;

  return {
    invalid,
    blocked,
    success: !invalid && !blocked,
  };
};

export const logout = async () => {
  const cookiesStorage = await cookies();
  cookiesStorage.delete("sipId");
  cookiesStorage.delete("saseId");

  redirect("/");
};
