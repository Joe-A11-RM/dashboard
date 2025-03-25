import dayjs from "dayjs";

export const formatDateString = (dateString) => {
  return dayjs(dateString).format("DD/MM/YYYY");
};
