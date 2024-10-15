export type VehicleType = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
  Make_Name: string;
  Model_Name: string;
};
export interface Vehicle {
  Make_Name: string;
  Model_Name: string;
}

export interface VehicleResponse {
  Results: Vehicle[];
}

export interface StaticParamsResponse {
  Results: { makeId: number }[];
}
