"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Bar, BarChart, Tooltip } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"



export function Dashboard({ onLogout }) {
  const router = useRouter();
  const [cryptoData, setCryptoData] = useState([
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: 56789.12,
      change: 2.5,
      volume: 45678.9,
      marketCap: 1234567890,
      news: [
        {
          id: 1,
          title: "Bitcoin Surges as Institutional Adoption Grows",
          sentiment: "positive",
          url: "https://example.com/bitcoin-institutional-adoption",
        },
        {
          id: 2,
          title: "Regulatory Concerns Weigh on Bitcoin Price",
          sentiment: "negative",
          url: "https://example.com/bitcoin-regulatory-concerns",
        },
        {
          id: 3,
          title: "Bitcoin Halving Event Sparks Bullish Outlook",
          sentiment: "positive",
          url: "https://example.com/bitcoin-halving-event",
        },
      ],
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: 1789.12,
      change: 3.7,
      volume: 23456.7,
      marketCap: 234567890,
      news: [
        {
          id: 1,
          title: "Ethereum Upgrades to Improve Scalability",
          sentiment: "positive",
          url: "https://example.com/ethereum-scalability-upgrades",
        },
        {
          id: 2,
          title: "Ethereum Gas Fees Remain a Concern for Users",
          sentiment: "negative",
          url: "https://example.com/ethereum-gas-fees",
        },
        {
          id: 3,
          title: "Ethereum Developers Announce Roadmap for Merge",
          sentiment: "positive",
          url: "https://example.com/ethereum-merge-roadmap",
        },
      ],
    },
    {
      id: "bnb",
      name: "Binance Coin",
      symbol: "BNB",
      price: 345.67,
      change: 1.9,
      volume: 12345.6,
      marketCap: 67890123,
      news: [
        {
          id: 1,
          title: "Binance Expands Ecosystem with New Partnerships",
          sentiment: "positive",
          url: "https://example.com/binance-new-partnerships",
        },
        {
          id: 2,
          title: "Regulatory Scrutiny Intensifies for Binance",
          sentiment: "negative",
          url: "https://example.com/binance-regulatory-scrutiny",
        },
        {
          id: 3,
          title: "Binance Coin Sees Increased Adoption in DeFi",
          sentiment: "positive",
          url: "https://example.com/binance-coin-defi-adoption",
        },
      ],
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      price: 45.67,
      change: 4.2,
      volume: 6789.0,
      marketCap: 12345678,
      news: [
        {
          id: 1,
          title: "Solana Ecosystem Expands with New DApps",
          sentiment: "positive",
          url: "https://example.com/solana-new-dapps",
        },
        {
          id: 2,
          title: "Solana Network Experiences Outages, Raising Concerns",
          sentiment: "negative",
          url: "https://example.com/solana-network-outages",
        },
        {
          id: 3,
          title: "Solana Attracts Increased Institutional Investment",
          sentiment: "positive",
          url: "https://example.com/solana-institutional-investment",
        },
      ],
    },
    {
      id: "doge",
      name: "Doge Coin",
      symbol: "DOGE",
      price: 23.45,
      change: 3.1,
      volume: 4567.8,
      marketCap: 6789012,
      news: [
        {
          id: 1,
          title: "Doge Coin Ecosystem Sees Rapid Growth",
          sentiment: "positive",
          url: "https://example.com/avalanche-ecosystem-growth",
        },
        {
          id: 2,
          title: "Doge Coin Faces Scalability Challenges",
          sentiment: "negative",
          url: "https://example.com/avalanche-scalability-challenges",
        },
        {
          id: 3,
          title: "Doge Coin Launches New Incentive Programs",
          sentiment: "positive",
          url: "https://example.com/avalanche-new-incentive-programs",
        },
      ],
    },
  ])
  const [selectedCrypto, setSelectedCrypto] = useState("btc")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
  })
  const handleCryptoChange = (id) => {
    setSelectedCrypto(id)
  }
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe)
  }
  const handleToggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState)
  }
  const handleLogout = () => {
    onLogout();
    router.push('/');  // Redirect to the login page
  };
  const selectedData = cryptoData.find((crypto) => crypto.id === selectedCrypto)
  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "bg-gray-850 text-white" : "bg-muted/40 text-white"}`}>
      <header className={`bg-background border-b px-4 py-3 flex items-center justify-between ${isDarkMode ? "border-black bg-gray-850" : "bg-white border-black text-black"}`}>
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <CoinsIcon className="w-6 h-6" />
            <span className="sr">CryptoGraphify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {cryptoData.map((crypto) => (
              <Button
                key={crypto.id}
                variant={selectedCrypto === crypto.id ? "secondary" : "ghost"}
                onClick={() => handleCryptoChange(crypto.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? "text-white bg-gray-850" : "text-black bg-white"}`}>
                {crypto.symbol}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`shrink-0 ${isDarkMode ? "border-black bg-black" : "bg-white border-gray-300 text-black"}`}>
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {selectedTimeframe}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`w-[200px] ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`} align="end">
                <DropdownMenuRadioGroup value={selectedTimeframe} onValueChange={handleTimeframeChange}>
                  <DropdownMenuRadioItem value="1D">1 Day</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1W">1 Week</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1M">1 Month</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1Y">1 Year</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src={userProfile.avatar}
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-[200px] ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`} align="end" forceMount>
              <div className="p-2">
                <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                <p className="text-sm">{userProfile.email}</p>
              </div>
              <DropdownMenuItem asChild>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full text-left">
                  Log out
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button variant="ghost" size="sm" onClick={handleToggleDarkMode} className="w-full text-left">
                  {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 ${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>
        <Card className={`col-span-1 md:col-span-2 lg:col-span-3 ${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>
          <CardHeader>
            <CardTitle>
              {selectedData.name} ({selectedData.symbol})
            </CardTitle>
            <CardDescription className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Real-time data and analysis for {selectedData.name}</CardDescription>
          </CardHeader>
          <CardContent> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> 
              <div className="flex flex-col gap-2">
                <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Price</div>
                <div className="text-2xl font-bold">${selectedData.price.toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Change</div>
                <div className={`text-2xl font-bold ${selectedData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {selectedData.change.toFixed(2)}%
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Volume</div>
                <div className="text-2xl font-bold">${selectedData.volume.toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Market Cap</div>
                <div className="text-2xl font-bold">${selectedData.marketCap.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`col-span-1 md:col-span-2 lg:col-span-2 ${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>
          <CardHeader>
            <CardTitle>Price Trend</CardTitle>
            <CardDescription className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Historical price trend for {selectedData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <LinechartChart className="aspect-[16/9]" />
          </CardContent>
        </Card>
        <Card className={`col-span-1 lg:col-span-1 ${isDarkMode ? "bg-gray-850 text-black" : "bg-white text-black"}`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>News Analysis</CardTitle>
            <CardDescription className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Latest news and sentiment analysis for {selectedData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {selectedData.news.map((article) => (
                <div
                  key={article.id}
                  className={`p-4 rounded-md ${article.sentiment === "positive" ? "bg-green-400" : "bg-red-400"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{article.title}</div>
                    <Badge variant={article.sentiment === "positive" ? "success" : "danger"} className="text-xs">
                      {article.sentiment}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground text-gray-900">
                    <Link href="#" target="_blank" className="underline" prefetch={false}>
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={`col-span-1 lg:col-span-1 ${isDarkMode ? "bg-gray-850 text-black" : "bg-white text-black"}`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Sentiment Analysis</CardTitle>
            <CardDescription className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Visualization of sentiment analysis for {selectedData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <BarchartChart className="aspect-square" />
          </CardContent>
        </Card>
        <Card className={`col-span-1 lg:col-span-1 ${isDarkMode ? "bg-gray-850 text-black" : "bg-white text-black"}`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Predictive Insights</CardTitle>
            <CardDescription className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Predictive model insights for {selectedData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Predicted Price</div>
                  <div className={`text-2xl font-bold ${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>
                    {(selectedData.price * 1.1).toFixed(2)}</div>
                </div>
                <div
                  className={`text-2xl font-bold ${(selectedData.price * 1.1 - selectedData.price) / selectedData.price >= 0 ? "text-green-500 dark:text-green-300" : "text-red-500 dark:text-red-300"}`}>
                  {(((selectedData.price * 1.1 - selectedData.price) / selectedData.price) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>Confidence Score</div>
                  <div className={`${isDarkMode ? "bg-gray-850 text-white" : "bg-white text-black"}`}>87%</div>
                </div>
                <Progress value={87} aria-label="87% confidence" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[200px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function CoinsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}


const calculateDomain = (data, key) => {
  const values = data.map(item => item[key]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Function to determine the scale for rounding
  const determineScale = (value) => {
    return Math.pow(10, Math.floor(Math.log10(value)));
  };

  // Adjust the min and max to the nearest scale
  const minScale = determineScale(minValue);
  const maxScale = determineScale(maxValue);

  const adjustedMin = Math.floor(minValue / minScale) * minScale;
  const adjustedMax = Math.ceil(maxValue / maxScale) * maxScale;

  return [adjustedMin < 0 ? 0 : adjustedMin, adjustedMax];
};

function LinechartChart(props) {
  const data = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  // Calculate the domain for the Y-axis
  const yDomain = calculateDomain(data, 'desktop');

  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={yDomain}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

/*export default LinechartChart;*/


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
