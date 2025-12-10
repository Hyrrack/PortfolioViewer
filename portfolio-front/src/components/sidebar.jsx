import { GalleryVerticalEnd } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

export const Sidebar = () => {
    const stocks = [
        { symbol: "AAPL", price: 189.25 },
        { symbol: "GOOG", price: 135.42 }
    ];

    return (
        <Sidebar>
            {stocks.map(s => (
                <div key={s.symbol}>{s.symbol} price: {s.price}</div>
            ))}
            <button>+</button>
        </Sidebar>
    )
}