import { NextResponse } from "next/server";
import data from "@/data/full_json_generated_data_vn_units.json";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ "city-code": string }> },
) {
  const { "city-code": cityCode } = await params;
  const city = (data as any[]).find((c) => c.Code === cityCode);

  if (!city) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  return NextResponse.json(city.Wards ?? []);
}
