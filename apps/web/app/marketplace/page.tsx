'use client';

/**
 * MARKETPLACE PAGE
 *
 * Atoms used:
 *   StatusBadge, SectionHeader, icons
 *   (SearchIco, FilterIco, CarIco, StarIco, PhoneIco, ShareIco, EyeIco)
 *
 * Molecules used:
 *   PageTopBar (no auth — public-facing header variant), LegendItem
 *
 * Organisms used:
 *   (No analytics organisms — marketplace is public/buyer-facing)
 *
 * Unique organisms to build for Marketplace:
 *   MarketplaceHero        – search bar + featured banner
 *   CarListingGrid         – responsive card grid with lazy loading
 *   CarListingCard         – image carousel, price, make/model/year, mileage, dealer badge
 *   MarketplaceFiltersSidebar – price range, make, body type, year, fuel, transmission
 *   CarDetailModal         – full specs, photo gallery, contact dealer CTA
 *   DealerBadge            – verified / inspected trust indicators
 */

import React from 'react';
import CarMarketplace from '../components/organism/market';

export default function MarketplacePage() {
  return <CarMarketplace />;
}
