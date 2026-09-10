import { v4 as uuidv4 } from "uuid";

export function generateMeetingCode() {
  const str = uuidv4().replace(/-/g, "");
  return `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7, 10)}`;
}
