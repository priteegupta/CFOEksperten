// app/api/exchange-rates/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
  // We fetch 'latest' with NOK as the base currency
  const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/NOK`;

  try {
    const response = await fetch(URL, {
      next: { revalidate: 3600 }, // Cache results for 1 hour to save API hits
    });

    const data = await response.json();

    if (data.result === "success") {
      return NextResponse.json({
        rates: {
          NOK: 1,
          USD: data.conversion_rates.USD,
          EUR: data.conversion_rates.EUR,
          GBP: data.conversion_rates.GBP,
        },
      });
    }
    throw new Error("API Limit reached or invalid key");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
