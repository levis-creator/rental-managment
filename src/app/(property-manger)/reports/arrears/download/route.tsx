import ArrearReport from "@/components/reports/ArrearReport";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { Arrears } from "@/lib/types";
import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

export async function GET() {
        const dataItems: Arrears[] | null = await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.ARREARS)
        const stream= await renderToStream(<ArrearReport arrears={dataItems!}/>)
    return new NextResponse(stream as unknown as ReadableStream)
}