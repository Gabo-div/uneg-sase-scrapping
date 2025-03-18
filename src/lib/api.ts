import ky from "ky";
import { redirect } from "@tanstack/react-router";

const get = async (url: string) => {
  const res = await ky
    .get(url, {
      searchParams: {
        PHPSESSID: sessionStorage.getItem("saseId") as string,
      },
    })
    .arrayBuffer();

  const decoder = new TextDecoder("iso-8859-1");

  const text = decoder.decode(res);
  if (
    text.includes("Lo siento su sesi&oacute;n ha caducado") ||
    text.includes("Lo siento su sesión ha caducado.")
  ) {
    throw redirect({ to: "/" });
  }

  return text;
};

const post = async (url: string) => {
  const res = await ky
    .get(url, {
      searchParams: {
        PHPSESSID: sessionStorage.getItem("saseId") as string,
      },
    })
    .text();

  if (res.includes("Lo siento su sesi&oacute;n ha caducado")) {
    throw redirect({ to: "/" });
  }

  return res;
};

const decodeResponse = async (res: Response) => {
  const buffer = await res.arrayBuffer();

  const decoder = new TextDecoder("iso-8859-1");

  return decoder.decode(buffer);
};

export const api = {
  get,
  post,
};

export const SIPApi = ky.create({
  hooks: {
    beforeRequest: [
      (req) => {
        const url = new URL(req.url);

        url.searchParams.set(
          "PHPSESSID",
          sessionStorage.getItem("sipId") || "",
        );

        return new Request(url, req);
      },
    ],
    afterResponse: [
      async (_req, _options, res) => {
        const text = await decodeResponse(res);

        console.log({ text });
        if (
          text.includes("Lo siento su sesi&oacute;n ha caducado") ||
          text.includes("Lo siento su sesión ha caducado.")
        ) {
          console.log("redirect");
          throw redirect({ to: "/" });
        }

        return new Response(text, {
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        });
      },
    ],
  },
});
