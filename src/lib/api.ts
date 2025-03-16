import ky from "ky";
import { redirect } from "@tanstack/react-router";

const get = async (url: string) => {
  const res = await ky
    .get(url, {
      searchParams: {
        PHPSESSID: sessionStorage.getItem("sessionId") as string,
      },
    })
    .arrayBuffer();

  const decoder = new TextDecoder("iso-8859-1");

  const text = decoder.decode(res);

  if (text.includes("Lo siento su sesi&oacute;n ha caducado")) {
    throw redirect({ to: "/" });
  }

  return text;
};

const post = async (url: string) => {
  const res = await ky
    .get(url, {
      searchParams: {
        PHPSESSID: sessionStorage.getItem("sessionId") as string,
      },
    })
    .text();

  if (res.includes("Lo siento su sesi&oacute;n ha caducado")) {
    throw redirect({ to: "/" });
  }

  return res;
};

export const api = {
  get,
  post,
};
