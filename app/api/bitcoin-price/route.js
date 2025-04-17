import axios from "axios";

export async function GET(request) {
  try {
    const response = await axios.get(
      "https://www.bitstamp.net/api/v2/ticker/btcusd/"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching Bitcoin price" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}