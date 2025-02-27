import { Icons } from "./Icons";


interface NavItem {
    icon: React.ElementType;  // Change type to React.ElementType for components
    title: string;
    path: string;
}

export const navitems: NavItem[] = [
    {
        icon: Icons.FaChartPie,
        title: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: Icons.FaHotTubPerson,
        title: "Property Owners",
        path: "/property-owners"
    },
    {
        icon: Icons.BsBuildingsFill,
        title: "Apartments",
        path: "/apartments"
    },
    {
        icon: Icons.SiHomeassistantcommunitystore,
        title: "Units",
        path: "/units"
    },
    {
        icon: Icons.BsFillPeopleFill,
        title: "Tenants",
        path: "/tenants"
    },
    {
        icon: Icons.FaChartPie,
        title: "Lease Agreements",
        path: "/lease-agreements"
    },
    {
        icon: Icons.FaFileInvoice,
        title: "Invoices",
        path: "/invoices"
    },
    {
        icon: Icons.MdPayments,
        title: "Payments",
        path: "/payments"
    },
    {
        icon: Icons.IoDocumentAttach,
        title: "Payment Transfers",
        path: "/payment-transfers"
    }
];
