import { useState } from "react"
import { Plus, Search, X } from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function StockSidebar({ stocks, activeStock, onSelectStock, onAddStock, onRemoveStock }) {
    const [isAdding, setIsAdding] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const AVAILABLE_STOCKS = [
        'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'V', 'WMT'
    ]

    const filteredStocks = AVAILABLE_STOCKS.filter(
        stock => stock.toLowerCase().includes(searchQuery.toLowerCase()) && !stocks.includes(stock)
    )

    const handleAddStock = (stock) => {
        onAddStock(stock)
        setSearchQuery("")
        setIsAdding(false)
    }

    return (
        <Card className="w-64 h-full flex flex-col rounded-none border-r">
            <CardHeader>
                <CardTitle>Your Stocks</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        {stocks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="mb-4 rounded-full bg-muted p-3">
                                    <Plus className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="mb-2 font-medium">No stocks yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Click Add Stock below to get started
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {stocks.map((stock) => (
                                    <div
                                        key={stock}
                                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeStock === stock
                                            ? "bg-accent"
                                            : "hover:bg-muted"
                                            }`}
                                        onClick={() => onSelectStock(stock)}
                                    >
                                        <span className={`font-medium ${activeStock === stock ? "text-accent-foreground" : ""
                                            }`}>
                                            {stock}
                                        </span>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onRemoveStock(stock)
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>

            <Separator />

            <CardFooter className="p-4">
                {!isAdding ? (
                    <Button
                        onClick={() => setIsAdding(true)}
                        className="w-full"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stock
                    </Button>
                ) : (
                    <div className="w-full space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search stocks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                                autoFocus
                            />
                        </div>

                        {searchQuery && (
                            <ScrollArea className="h-48 border rounded-md">
                                {filteredStocks.length > 0 ? (
                                    <div className="p-2">
                                        {filteredStocks.map((stock) => (
                                            <div
                                                key={stock}
                                                onClick={() => handleAddStock(stock)}
                                                className="p-2 rounded-md hover:bg-muted cursor-pointer"
                                            >
                                                {stock}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-muted-foreground">No stocks found</p>
                                    </div>
                                )}
                            </ScrollArea>
                        )}

                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAdding(false)
                                setSearchQuery("")
                            }}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}