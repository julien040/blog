import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function parseDate(date: string) {
  return dayjs(date, "DD-MM-YYYY");
}
