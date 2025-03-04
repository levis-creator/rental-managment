
import currence_converter from '@/lib/currency_converter';
import { Statistic } from '@/lib/Statistic.';

import { Payment } from '@/lib/types';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";

const PaymentReport = ({ payments, transactionPeriod }: { payments: Payment[]; transactionPeriod?: string; }) => {
  const arrearsStatics = new Statistic<Payment>()

  const tw = createTw({
    theme: {

      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });
  return (
    <Document>
      <Page size="A4" style={{ padding: 40, fontSize: 11 }}>

        <Text style={tw("text-xl font-bold text-center mb-4")}>Rent Payment Report</Text>
        <View style={tw("bg-gray-200 p-2 my-8")}>
          <View>
            <Text style={tw("text-lg font-bold")}>Summary</Text>
            <View style={tw("flex gap-2")}>{transactionPeriod &&
              <View style={tw("flex flex-row")}>
                <Text style={tw("w-36")}>Transaction Period:</Text>
                <Text style={tw("flex-1")}>{transactionPeriod}</Text>
              </View>}
              <View style={tw("flex flex-row")}>
                <Text style={tw("w-36")}>Total Balance:</Text>
                <Text style={tw("flex-1")}>{currence_converter(arrearsStatics.sum(payments, 'amountPaid'))}</Text>
              </View>

            </View>
          </View>

        </View>
        <View style={tw("w-full mb-4")}>
          <View style={tw("bg-gray-200 p-2")}>
            <View style={tw(" flex flex-row")}>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Transaction Id</Text>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Unit</Text>
              <Text style={tw("border-gray-400 p-2 font-bold px-4 flex-1")}>Payment Method</Text>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Amount Paid</Text>
            </View>
          </View>
          <View style={tw("w-full")}>
            {payments.map((payment, index) => (
              <View style={tw("p-2 w-full border-t border-gray-400 flex flex-row")} key={index}>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{payment.transactionId}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{payment.unitName}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{payment.paymentMethod}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2 px-4")}>{currence_converter(payment.amountPaid)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}


export default PaymentReport