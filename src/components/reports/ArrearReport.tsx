
import currence_converter from '@/lib/currency_converter';
import { Statistic } from '@/lib/Statistic.';

import { Arrears } from '@/lib/types';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";

const ArrearReport = ({ arrears }: { arrears: Arrears[] }) => {
  const arrearsStatics=new Statistic<Arrears>()

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
        
        <Text style={tw("text-xl font-bold text-center mb-4")}>Rent Arrears Report</Text>
        <View style={tw("bg-gray-200 p-2 my-8")}>
          <View> 
            <Text style={tw("text-lg font-bold")}>Summary</Text>
            <View style={tw("flex gap-2")}>
              <View style={tw("flex flex-row")}>
                <Text style={tw("w-36")}>Total Balance:</Text>
                <Text style={tw("flex-1")}>{currence_converter(arrearsStatics.sum(arrears, 'balanceDue'))}</Text>
              </View>
              <View style={tw("flex flex-row")}>
                <Text style={tw("w-36")}>Overpaid:</Text>
                <Text style={tw("flex-1")}>{currence_converter(arrearsStatics.sum(arrears, 'overpaidAmount'))}</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={tw("w-full mb-4")}>
          <View style={tw("bg-gray-200 p-2")}>
            <View style={tw(" flex flex-row")}>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Tenant Name</Text>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Apartment Name</Text>
              <Text style={tw("border-gray-400 p-2 font-bold px-4 flex-1")}>Amount Due</Text>
              <Text style={tw("border-gray-400 p-2 font-bold px-4 flex-1")}>Amount Paid</Text>
              <Text style={tw("border-gray-400 p-2 font-bold px-4 flex-1")}>Balance Due</Text>
              <Text style={tw("border-gray-400 p-2 font-bold flex-1")}>Status</Text>
            </View>
          </View>
          <View style={tw("w-full")}>
            {arrears.map((invoice, index) => (
              <View style={tw("p-2 w-full border-t border-gray-400 flex flex-row")} key={index}>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{invoice.tenantName}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{invoice.apartmentName}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2 px-4")}>{currence_converter(invoice.amountDue)}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2 px-4")}>{currence_converter(invoice.amountPaid)}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2 px-4")}>{currence_converter(invoice.balanceDue)}</Text>
                <Text style={tw("border-gray-400 flex-1 p-2")}>{invoice.paymentStatus}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}


export default ArrearReport