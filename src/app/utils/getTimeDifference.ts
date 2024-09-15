export const getRentalHour = (startTime: Date, returnTime: Date): number => {
  const startTimeStamps = startTime.getTime();
  const returnTimeStamps = returnTime.getTime();

  return returnTimeStamps - startTimeStamps;
};
