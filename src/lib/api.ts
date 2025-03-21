import ky, { AfterResponseHook, BeforeRequestHook } from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const cookiesStorage = await cookies();
    cookiesStorage.delete("sipId");
    cookiesStorage.delete("saseId");
    redirect("/");
  }

  return new Response(text, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
};

const createTokenHook = (token: string) => {
  const hook: BeforeRequestHook = async (req) => {
    const url = new URL(req.url);

    const sessionId = (await cookies()).get(token);

    if (sessionId) {
      url.searchParams.set("PHPSESSID", sessionId.value);
    }

    return new Request(url, req);
  };

  return hook;
};

const headers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.8177.1037 Safari/537.36",
};

export const api = ky.create({
  headers,
  hooks: {
    beforeRequest: [createTokenHook("saseId")],
    afterResponse: [checkSessionHook],
  },
});

export const SIPApi = ky.create({
  headers,
  hooks: {
    beforeRequest: [createTokenHook("sipId")],
    afterResponse: [checkSessionHook],
  },
});
