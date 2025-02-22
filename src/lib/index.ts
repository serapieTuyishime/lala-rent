import { locationCodes } from "@/data/Location-codes"

export const generateLocationName = (locationCode?: string) => {
  if(!locationCode) return ""
  return locationCodes.find(location => location.code === locationCode)?.name
}

export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}