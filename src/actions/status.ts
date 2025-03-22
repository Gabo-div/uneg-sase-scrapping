"use server";

import { api } from "@/lib/api";

export const checkStatus = async () => {
  return await api
    .get("https://servicio.uneg.edu.ve/sase/principal/login.php", {
      retry: 0,
    })
    .text();
};
