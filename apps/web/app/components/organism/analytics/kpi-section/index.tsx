import { Grid } from '@chakra-ui/react';
import { KpiCard, KpiCardProps } from '../../../atoms';

export type KPISectionProps = {
  stats: KpiCardProps[];
};

export const KPISection: React.FC<KPISectionProps> = ({ stats }) => (
  <Grid templateColumns="repeat(4,1fr)" gap="12px">
    {stats.map((s, i) => (
      <KpiCard key={i} {...s} />
    ))}
  </Grid>
);
