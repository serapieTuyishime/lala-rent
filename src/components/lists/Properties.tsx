import { useQuery } from "@tanstack/react-query"
import { ReservedProperty } from "../../../types";
import { SearchFormProps } from "../search-bar";
import { LargePropertyCard } from "../cards/property-large";

const PropertiesList = ({ queryData }: { queryData: SearchFormProps }) => {
  const dateIn = queryData?.checkInDate;
  const dateOut = queryData?.checkOutDate;
  const locationCode = queryData?.locationCode

  const { data, isLoading } = useQuery<ReservedProperty[], Error>({
    queryKey: ['available-properties', dateIn, dateOut, locationCode],
    queryFn: async () => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/search-available?dateIn=${dateIn}&dateOut=${dateOut}&locationCode=${locationCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await res.json();
    },
    enabled: !!queryData
  });


  if (isLoading) return <div>Loaging</div>
  return (
    <div>
      {data?.map((property, index) => {
        return <LargePropertyCard key={index} property={property} />
      })}
    </div>
  )
}

export default PropertiesList