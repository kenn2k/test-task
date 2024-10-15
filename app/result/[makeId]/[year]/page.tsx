import { StaticParamsResponse, VehicleResponse } from "@/types/types";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not defined in the environment variables.");
  }

  const response = await fetch(apiUrl);

  const data: StaticParamsResponse = await response.json();

  return data.Results.map((car) => ({
    makeId: car.makeId,
  }));
}
//!
export const getInfo = async (
  makeId: number,
  year: number
): Promise<VehicleResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_DYNAMIC_URL;

  if (!baseUrl) {
    throw new Error("Dynamic URL is not defined");
  }

  const res = await fetch(`${baseUrl}/${makeId}/modelyear/${year}?format=json`);

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle information");
  }

  const data = await res.json();
  return data;
};

//!
const YearPage = async ({
  params,
}: {
  params: { makeId: number; year: number };
}) => {
  const { makeId, year } = params;
  const vehicle = await getInfo(Number(makeId), year);

  const carInfo = vehicle.Results[0];

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col gap-4">
          <h1 className="text-red-600 text-2xl font-bold">Car Information</h1>
          <p className="text-red-600">Make ID: {makeId}</p>
          <p className="text-red-600">Year: {year}</p>
          {carInfo ? (
            <>
              <p className="text-red-600">Make Name: {carInfo.Make_Name}</p>
              <p className="text-red-600">Model Name: {carInfo.Model_Name}</p>
            </>
          ) : (
            <p className="text-red-600">No car information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YearPage;
