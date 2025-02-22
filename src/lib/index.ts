import { locationCodes } from "@/data/Location-codes"

export const generateLocationCode = (locationCode: string) => {
  return locationCodes.find(location => location.code === locationCode)?.name
}