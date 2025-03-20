import ky, { AfterResponseHook, BeforeRequestHook } from "ky";
import { redirect } from "@tanstack/react-router";

const decodeResponse = async (res: Response) => {
  const buffer = await res.arrayBuffer();

  const decoder = new TextDecoder("iso-8859-1");

  return decoder.decode(buffer);
};

const checkSessionHook: AfterResponseHook = async (_req, _options, res) => {
  const text = await decodeResponse(res);

  if (
    text.includes("Lo siento su sesi&oacute;n ha caducado") ||
    text.includes("Lo siento su sesión ha caducado.")
  ) {
    throw redirect({ to: "/" });
  }

  return new Response(text, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
};

const createTokenHook = (token: string) => {
  const hook: BeforeRequestHook = (req) => {
    const url = new URL(req.url);

    url.searchParams.set("PHPSESSID", sessionStorage.getItem(token) || "");

    return new Request(url, req);
  };

  return hook;
};

export const api = ky.create({
  hooks: {
    beforeRequest: [createTokenHook("saseId")],
    afterResponse: [checkSessionHook],
  },
});

export const SIPApi = ky.create({
  hooks: {
    beforeRequest: [createTokenHook("sipId")],
    afterResponse: [checkSessionHook],
  },
});
