import { Colors } from '../../ui/color-pack';

export const Ico = ({
  d,
  size = 16,
  stroke = 'currentColor',
  fill = 'none',
  sw = 2,
}: {
  d: string | string[];
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
  >
    {Array.isArray(d) ? (
      d.map((p, i) => <path key={i} d={p} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

export const CheckIco = ({ color = Colors.WHITE }: { color?: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const ArrowIco = () => (
  <Ico d="M5 12h14M12 5l7 7-7 7" size={15} sw={2.5} />
);
export const BackIco = () => (
  <Ico d="M19 12H5M12 19l-7-7 7-7" size={15} sw={2.5} />
);
export const CarIco = () => (
  <Ico
    d={[
      'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5',
      'M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
      'M14 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0',
    ]}
    size={18}
    stroke={Colors.WHITE}
  />
);
export const ShieldIco = () => (
  <Ico
    d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4']}
    size={13}
    stroke={Colors.GREEN}
  />
);
export const PhoneIco = () => (
  <Ico
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.14-1.14a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
    size={14}
  />
);
export const UploadIco = () => (
  <Ico
    d={[
      'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      'M17 8l-5-5-5 5',
      'M12 3v12',
    ]}
    size={20}
    stroke={Colors.P}
  />
);
export const CloseIco = () => (
  <Ico d="M18 6 6 18M6 6l12 12" size={10} sw={2.5} stroke={Colors.P} />
);
export const LocIco = () => (
  <Ico
    d={[
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      'M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    ]}
    size={12}
  />
);

// WhatsApp logo
export const WaLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={Colors.WHITE}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.062.524 4.004 1.447 5.7L0 24l6.456-1.424A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.384l-.36-.214-3.732.824.839-3.646-.235-.373A9.818 9.818 0 1 1 12 21.818z" />
  </svg>
);
