import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const giftCards = [
  {
    id: 1,
    brand: 'Flipkart',
    logo: '🛒',
    priceType: 'fixed',
    discount: 1.8,
    denominations: [100, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  },
  {
    id: 2,
    brand: 'BookMyShow',
    logo: '🎬',
    priceType: 'custom',
    discount: 2.0,
    minPrice: 100,
    maxPrice: 10000,
  },
  {
    id: 3,
    brand: 'PVR',
    logo: '🎥',
    priceType: 'custom',
    discount: 8.0,
    minPrice: 100,
    maxPrice: 500,
  },
  {
    id: 4,
    brand: 'Myntra',
    logo: '👕',
    priceType: 'custom',
    discount: 2.0,
    minPrice: 100,
    maxPrice: 10000,
  },
  {
    id: 5,
    brand: 'Dominos',
    logo: '🍕',
    priceType: 'custom',
    discount: 4.0,
    minPrice: 100,
    maxPrice: 10000,
  },
  {
    id: 6,
    brand: 'Uber',
    logo: '🚗',
    priceType: 'custom',
    discount: 2.0,
    minPrice: 100,
    maxPrice: 10000,
  },
  {
    id: 7,
    brand: 'Cinepolis',
    logo: '🎞️',
    priceType: 'custom',
    discount: 9.0,
    minPrice: 100,
    maxPrice: 500,
  },
];

const calculateSellingPrice = (faceValue, discount) => {
  const discountAmount = (faceValue * discount) / 100;
  return Math.round(faceValue - discountAmount);
};

const calculateSavings = (faceValue, sellingPrice) => {
  return faceValue - sellingPrice;
};

function BrandCard({ card }) {
  const whatsappNumber = '919052388981';
  const [customPrice, setCustomPrice] = useState('');
  const [customResult, setCustomResult] = useState(null);
  const [error, setError] = useState('');

  const handleWhatsApp = (brand, faceValue, sellingPrice) => {
    const message = `Hi GiftZone, I want to buy a ${brand} ₹${faceValue} Gift Card for ₹${sellingPrice}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
  };

  const handleCustomPriceSubmit = (e) => {
    e.preventDefault();
    const price = parseInt(customPrice);
    setError('');
    setCustomResult(null);

    if (!customPrice) {
      setError('Enter an amount');
      return;
    }

    if (isNaN(price)) {
      setError('Invalid amount');
      return;
    }

    if (price < card.minPrice || price > card.maxPrice) {
      setError(`Amount should be between ₹${card.minPrice} - ₹${card.maxPrice}`);
      return;
    }

    const sellingPrice = calculateSellingPrice(price, card.discount);
    const savings = calculateSavings(price, sellingPrice);

    setCustomResult({
      faceValue: price,
      sellingPrice,
      savings,
    });
  };

  const renderDenominations = () => {
    let prices = [];

    if (card.priceType === 'fixed') {
      prices = card.denominations;
    } else {
      // Custom: show common price points
      const step = card.maxPrice >= 5000 ? 500 : 100;
      for (let i = card.minPrice; i <= card.maxPrice; i += step) {
        prices.push(i);
      }
    }

    return prices.map((faceValue) => {
      const sellingPrice = calculateSellingPrice(faceValue, card.discount);
      const savings = calculateSavings(faceValue, sellingPrice);

      return (
        <div key={faceValue} className={styles.denominationRow}>
          <div className={styles.priceInfo}>
            <span className={styles.faceValue}>₹{faceValue}</span>
            <span className={styles.sellingPrice}>₹{sellingPrice}</span>
            <span className={styles.saving}>Save ₹{savings}</span>
          </div>
          <button
            className={styles.button}
            onClick={() => handleWhatsApp(card.brand, faceValue, sellingPrice)}
          >
            Buy
          </button>
        </div>
      );
    });
  };

  return (
    <div className={styles.brandCard}>
      <div className={styles.brandHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div className={styles.emoji}>{card.logo}</div>
          <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#333', fontWeight: 600 }}>
            {card.brand}
          </h3>
        </div>
        <span className={styles.discount}>{card.discount}% OFF</span>
      </div>

      {/* Custom Price Calculator - Right after heading */}
      {card.priceType === 'custom' && (
        <div className={styles.customPriceSection}>
          <form onSubmit={handleCustomPriceSubmit} className={styles.customPriceForm}>
            <input
              type="number"
              placeholder={`₹${card.minPrice}-${card.maxPrice}`}
              value={customPrice}
              onChange={(e) => {
                setCustomPrice(e.target.value);
                setError('');
              }}
              min={card.minPrice}
              max={card.maxPrice}
              className={styles.customPriceInput}
            />
            <button type="submit" className={styles.customPriceButton}>
              Calculate
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}

          {/* Show Result */}
          {customResult && (
            <div className={styles.customResult}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Bill:</span>
                <span className={styles.resultFaceValue}>₹{customResult.faceValue}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Pay:</span>
                <span className={styles.resultPrice}>₹{customResult.sellingPrice}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Save:</span>
                <span className={styles.resultSaving}>₹{customResult.savings}</span>
              </div>
              <button
                className={styles.customResultButton}
                onClick={() =>
                  handleWhatsApp(card.brand, customResult.faceValue, customResult.sellingPrice)
                }
              >
                Order Now
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.denominations}>
        {renderDenominations()}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>GiftZone 🎁 — Gift Cards at Better Prices</title>
        <meta name="description" content="Buy discounted gift cards from top brands" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🎁</text></svg>" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>🎁 GiftZone</h1>
          <p>Digital Gift Cards at Better Prices</p>
        </header>

        <section className={styles.cardsContainer}>
          {giftCards.map((card) => (
            <BrandCard key={card.id} card={card} />
          ))}
        </section>

        <footer className={styles.footer}>
          <p>Questions? Message us on WhatsApp</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Payment via UPI • Instant delivery
          </p>
        </footer>
      </main>
    </>
  );
}
