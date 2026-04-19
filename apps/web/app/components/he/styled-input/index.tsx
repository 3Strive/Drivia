import { Input, Box } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { Colors } from '../../ui/color-pack';

type StyledInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefix?: string;
  type?: string;
};

export const StyledInput = ({
  placeholder,
  value,
  onChange,
  prefix,
  type = 'text',
}: StyledInputProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Box position="relative">
      {prefix && (
        <Box
          position="absolute"
          left="13px"
          top="50%"
          transform="translateY(-50%)"
        >
          {prefix}
        </Box>
      )}

      <Input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        pl={prefix ? '36px' : '14px'}
        borderColor={Colors.LINE}
        _focus={{
          borderColor: Colors.P,
          boxShadow: `0 0 0 3px ${Colors.P}20`,
        }}
      />
    </Box>
  );
};
