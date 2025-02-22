import { locationCodes } from "@/data/Location-codes"

export const generateLocationName = (locationCode?: string) => {
  if(!locationCode) return ""
  return locationCodes.find(location => location.code === locationCode)?.name
}