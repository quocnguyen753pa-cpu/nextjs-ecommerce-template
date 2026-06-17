import { NextResponse } from "next/server";
import data from "@/data/full_json_generated_data_vn_units.json";

export async function GET() {
  const cities = (data as any[]).map(({ Wards: _, ...city }) => city);
  return NextResponse.json(cities);
}
