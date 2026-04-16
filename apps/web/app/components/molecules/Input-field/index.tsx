import { Box } from '@chakra-ui/react';
import { FieldLabel } from '../../atoms/field-label';
import { StyledInput } from '../../atoms/styled-input';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefix?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
};

export const InputField = ({
  label,
  prefix,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <Box mb="14px">
      <FieldLabel>{label}</FieldLabel>
      <StyledInput {...props} prefix={prefix ? String(prefix) : undefined} />
    </Box>
  );
};
