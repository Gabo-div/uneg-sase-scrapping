import { api } from "@/lib/api";
import {
  ApprovedCourse,
  Course,
  CoursesInfo,
  DisapprovedCourse,
  RegisteredCourse,
} from "@/types/course";
import { load } from "cheerio";

export const getCoursesSummary = async () => {
  const res = await api
    .get("https://servicio.uneg.edu.ve/sase/expediente/sce114.php")
    .text();

  const $ = load(res);

  const registered: RegisteredCourse[] = [];

  const $registered = $($("table")[4]);

  $registered.find("tr").map((i, row) => {
    if (i === 0) {
      return;
    }

    const $row = $(row);

    let courseId: string | null = null;
    let teacherName: string | null = null;
    let teacherEmail: string | null = null;
    let section: number | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        const [id] = text.split("-");
        courseId = id.trim();
      }

      if (j === 1) {
        const [name, email] = text.split("-");
        teacherName = name.trim();
        teacherEmail = email.trim();
      }

      if (j === 3) {
        const [s] = text.split("-");
        section = Number(s.trim());
      }
    });

    if (courseId && section) {
      registered.push({
        courseId,
        teacherName,
        teacherEmail,
        section,
      });
    }
  });

  const approved: ApprovedCourse[] = [];

  const $approved = $($("table")[6]);

  $approved.find("tr").map((i, row) => {
    if (i === 0) {
      return;
    }

    const $row = $(row);

    let courseId: string | null = null;
    let calification: number | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        const [id] = text.split("-");
        courseId = id.trim();
      }

      if (j === 2) {
        calification = Number(text.trim());
      }
    });

    if (courseId && calification) {
      approved.push({
        courseId,
        calification,
      });
    }
  });

  const disapproved: DisapprovedCourse[] = [];

  const $disapproved = $($("table")[7]);

  $disapproved.find("tr").map((i, row) => {
    if (i === 0) {
      return;
    }

    const $row = $(row);

    let courseId: string | null = null;
    let times: number | null = null;
    let pending: boolean = false;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        const [id] = text.split("-");
        courseId = id.trim();
      }

      if (j === 2) {
        times = Number(text.trim());
      }

      if (j === 3) {
        pending = text.trim() !== "NO";
      }
    });

    if (courseId && times) {
      disapproved.push({
        courseId,
        times,
        pending,
      });
    }
  });

  return { registered, approved, disapproved };
};

export const getAllCourses = async () => {
  const res = await api
    .get("https://servicio.uneg.edu.ve/sase/expediente/sce702.php")
    .text();

  const $ = load(res);

  const $registered = $($("table")[3]);

  const courses: Course[] = [];

  $registered.find("tr").map((i, row) => {
    if (i === 0) {
      return;
    }

    const $row = $(row);

    let id: string | null = null;
    let semester: number | null = null;
    let name: string | null = null;
    let uc: number | null = null;
    let required: string[] = [];
    let semesterRequired: number | null = null;

    $row.find("td").map((j, col) => {
      const $col = $(col);
      const text = $col.text();

      if (j === 0) {
        semester = Number(text.trim());
      }

      if (j === 1) {
        id = text.trim();
      }

      if (j === 2) {
        name = text.trim();
      }

      if (j === 3) {
        uc = Number(text.trim());
      }

      if (j === 4) {
        let t = text;

        if (text.includes("/")) {
          const splitted = text.split("/");
          t = splitted[0];

          semesterRequired = Number(splitted[1][1]);
        }

        required = t
          .trim()
          .split(" ")
          .map((t) => t.trim())
          .filter((t) => !!t);
      }
    });

    if (id && name && required) {
      courses.push({
        id,
        semester: semester || null,
        name,
        uc: uc || 0,
        required,
        semesterRequired: semesterRequired || null,
      });
    }
  });

  return courses;
};

export const getInfoCourses = async (): Promise<CoursesInfo> => {
  const [courses, summary] = await Promise.all([
    getAllCourses(),
    getCoursesSummary(),
  ]);

  return { courses, ...summary };
};
