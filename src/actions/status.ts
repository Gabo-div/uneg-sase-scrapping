"use server";

import ky from "ky";

export const checkStatus = async () => {
  return await ky
    .get("https://servicio.uneg.edu.ve/sase/principal/login.php", {
      retry: 0,
      headers: {
        Origin: "https://servicio.uneg.edu.ve/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.8177.1037 Safari/537.36",
      },
    })
    .text();
};
