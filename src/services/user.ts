import { api } from "@/lib/api";
import { load } from "cheerio";
import { academicDataSchema, personalDataSchema } from "@/types/student";

const getPersonalData = async () => {
  const res = await api.get(
    "https://servicio.uneg.edu.ve/sase/expediente/sce101.php",
  );

  const $ = load(res);

  const generalData: (string | number | null)[] = [];

  const $general = $($("table")[3]);

  $general.find("td:not(.txtNormalBold)").map((i, element) => {
    const $td = $(element);
    const text = $td.text();

    if (i === 5) {
      const t = text.trim().replace("HERE: ", "");
      generalData.push(t.slice(0, t.length / 2));
      return;
    }

    if (i === 6 || i === 7 || i === 8 || i === 9) {
      generalData.push(Number(text.trim()));
      return;
    }

    generalData.push(text.trim() || null);
  });

  const birthData: string[] = [];

  const $birth = $($("table")[4]);

  $birth.find("td:not(.txtNormalBold)").map((i, element) => {
    const $td = $(element);
    const text = $td.text();

    if (i === 0) {
      return;
    }

    birthData.push(text.trim());
  });

  const addressData: string[] = [];

  const $address = $($("table")[6]);

  $address.find("td:not(.txtNormalBold)").map((i, element) => {
    const $td = $(element);
    const text = $td.text();

    if (i === 1) {
      addressData.push(text.trim());
    }
  });

  const [
    ci,
    status,
    surnames,
    campus,
    names,
    career,
    coursedUC,
    academicIndex,
    approvedUC,
    level,
    record,
    academicEmail,
    email,
    alternativeEmail,
    phoneNumber,
    alternativePhoneNumber,
  ] = generalData;

  const [birthdate, state, birthplace, country, genre, maritalStatus] =
    birthData;

  const [address] = addressData;

  return personalDataSchema.parse({
    ci,
    status,
    surnames,
    campus,
    names,
    career,
    coursedUC,
    academicIndex,
    approvedUC,
    level,
    record,
    academicEmail,
    email,
    alternativeEmail,
    phoneNumber,
    alternativePhoneNumber,
    birthdate,
    state,
    birthplace,
    country,
    genre,
    maritalStatus,
    address,
  });
};

const getAcademicData = async () => {
  const res = await api.get(
    "https://servicio.uneg.edu.ve/sase/expediente/sce102.php",
  );

  const $ = load(res);

  const lapses: (string | number | null)[] = [];

  const $lapses = $($("table")[4]);

  $lapses.find("td.txtNormalSmall").map((i, element) => {
    const $td = $(element);
    const text = $td.text();

    if (i === 4 || i === 5) {
      lapses.push(Number(text.trim()));
      return;
    }

    lapses.push(text.trim() || null);
  });

  const creditsAndStatistics: (number | null)[] = [];

  const $creditsAndStatistics = $($("table")[5]);

  $creditsAndStatistics.find("td.txtNormalSmall").map((_, element) => {
    const $td = $(element);
    const text = $td.text();

    creditsAndStatistics.push(text.trim() ? Number(text.trim()) : null);
  });

  const indexesAndRegistration: (string | number | null)[] = [];

  const $indexesAndRegistration = $($("table")[6]);

  $indexesAndRegistration.find("td.txtNormalSmall").map((i, element) => {
    const $td = $(element);
    const text = $td.text();

    if (i === 0 || i === 2 || i === 4 || i === 7 || i === 9) {
      indexesAndRegistration.push(Number(text.trim().replace(",", ".")));
      return;
    }

    indexesAndRegistration.push(text.trim() || null);
  });

  const [
    technologicalDegree,
    firstSemester,
    profesionalDegree,
    lastSemester,
    pensum,
    level,
  ] = lapses;

  const [
    coursedUC,
    readmissions,
    approvedUC,
    careerChanges,
    technologicalUC,
    repeatsRegimen,
    profesionalUC,
    withdrawals,
  ] = creditsAndStatistics;

  const [
    courseIndex,
    registrationDate,
    academicIndex,
    registeredBy,
    projectIndex,
    registrationOrigin,
    formNumber,
    technologicalIndex,
    campus,
    lastIndex,
    career,
  ] = indexesAndRegistration;

  return academicDataSchema.parse({
    technologicalDegree,
    firstSemester,
    profesionalDegree,
    lastSemester,
    pensum,
    level,
    coursedUC,
    readmissions,
    approvedUC,
    careerChanges,
    technologicalUC,
    repeatsRegimen,
    profesionalUC,
    withdrawals,
    courseIndex,
    registrationDate,
    academicIndex,
    registeredBy,
    projectIndex,
    registrationOrigin,
    formNumber,
    technologicalIndex,
    campus,
    lastIndex,
    career,
  });
};

export const getUserInfo = async () => {
  const [personalData, academicData] = await Promise.all([
    getPersonalData(),
    getAcademicData(),
  ]);

  return { personalData, academicData };
};
