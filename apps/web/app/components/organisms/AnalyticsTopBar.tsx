import React from 'react';
import { PageTopBar } from '../molecules/PageTopBar';
import { PeriodSelector, Period } from '../atoms/PeriodSelector';

// ─── ANALYTICS-SPECIFIC TOP BAR ───────────────────────────────────────────────
interface AnalyticsTopBarProps {
  period: Period;
  onPeriodChange: (p: Period) => void;
}

export const AnalyticsTopBar = ({ period, onPeriodChange }: AnalyticsTopBarProps) => (
  <PageTopBar breadcrumb="Drivia / Analytics" title="Analytics">
    <PeriodSelector value={period} onChange={onPeriodChange} />
  </PageTopBar>
);
