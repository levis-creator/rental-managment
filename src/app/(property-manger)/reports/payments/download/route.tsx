import PaymentReport from "@/components/reports/PaymentsReport";
import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { fetchData } from "@/lib/db_operations";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { Payment } from "@/lib/types";

// API Route with Optional Start and End Date + Transaction Period
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Fetch all payment data
    const allPayments: Payment[] | null = await fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.PAYMENT_SUMMARY);

    if (!allPayments) {
      return NextResponse.json({ message: "No payment data found" }, { status: 404 });
    }

    let filteredPayments = allPayments;
    let transactionPeriod = "All Transactions";

    // Filter Payments by Date if startDate or endDate is provided
    if (startDate && endDate) {
      filteredPayments = allPayments.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
      });

      transactionPeriod = `${startDate} to ${endDate}`;
    }

    if (filteredPayments.length === 0) {
      return NextResponse.json(
        { message: "No payments found for the selected date range" },
        { status: 404 }
      );
    }

    // Generate PDF with Payments and Transaction Period
    const stream = await renderToStream(
      <PaymentReport payments={filteredPayments} transactionPeriod={transactionPeriod} />
    );

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="payment-report.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ message: "Failed to generate PDF" }, { status: 500 });
  }
}
