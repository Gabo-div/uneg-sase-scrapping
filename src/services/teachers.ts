import { api } from "@/lib/api";
import { Teacher } from "@/types/teacher";
import { load } from "cheerio";

export const getTeachers = async () => {
  const res = await api
    .get("https://servicio.uneg.edu.ve/sase/evaluacion/sisa001.php")
    .text();

  const $ = load(res);

  const $registered = $($("table")[3]);

  const teachers: Teacher[] = [];

  $registered.find("tr").map((i, row) => {
    if (i === 0) {
      return;
    }

    const $row = $(row);

    let courseId: string | null = null;
    let courseSection: number | null = null;
    let ci: string | null = null;
    let name: string | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        courseId = text.trim();
      }

      if (j === 2) {
        courseSection = Number(text.trim());
      }

      if (j === 3) {
        const [tci, tname] = text.split("-");
        ci = tci.trim();
        name = tname.trim();
      }
    });

    if (courseId && courseSection && ci && name) {
      teachers.push({
        courseId,
        courseSection,
        ci,
        name,
      });
    }
  });

  return teachers;
};
