import { useState, useEffect } from 'react';

export const BitcoinPriceDisplay = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd/');
        const data = await response.json();
        setBitcoinPrice(parseFloat(data.last));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
    const intervalId = setInterval(fetchBitcoinPrice, 2100);

    return () => clearInterval(intervalId);
  }, []);

  const currentValue = loading && bitcoinPrice === null
    ? 'Loading...'
    : `$${(10000 * (bitcoinPrice || 0)).toLocaleString()} USD`;

  return (
    <div className='mt-4 text-orange-500 font-semibold'>
      10,000 BTC = 2🍕 → {currentValue}
      {!loading && <span className='text-xs ml-2 text-green-400'>↻ Live</span>}
    </div>
  );
};