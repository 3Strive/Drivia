import { Box, HStack, Text, Textarea } from '@chakra-ui/react';
import { Platform } from '../../../shared/types';
import { COLORS } from '../../atoms';

// ─── CAPTION PREVIEW ─────────────────────────────────────────────────────────
interface CaptionEditorProps {
  platform: Platform;
  value: string;
  onChange: (v: string) => void;
}

export function CaptionEditor({
  platform,
  value,
  onChange,
}: CaptionEditorProps): JSX.Element {
  const limit = platform.charLimit;
  const count = value.length;
  const overLimit = limit !== null && count > limit;

  return (
    <Box>
      <HStack justify="space-between" mb="6px">
        <HStack gap="6px">
          <Box
            w="16px"
            h="16px"
            borderRadius="4px"
            bg={platform.bg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="9px"
            flexShrink="0"
          >
            {platform.icon}
          </Box>
          <Text fontSize="12px" fontWeight="600" color="gray.600">
            {platform.name}
          </Text>
        </HStack>
        {limit !== null && (
          <Text fontSize="11px" color={overLimit ? 'red.400' : 'gray.400'}>
            {count}/{limit}
          </Text>
        )}
      </HStack>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        fontSize="12px"
        lineHeight="1.6"
        borderRadius="10px"
        borderColor={overLimit ? 'red.300' : 'gray.200'}
        bg="gray.50"
        resize="vertical"
        _focus={{
          borderColor: COLORS.primary,
          boxShadow: `0 0 0 1px ${COLORS.primary}`,
          bg: COLORS.white,
        }}
        _placeholder={{ color: 'gray.300' }}
        fontFamily="'DM Sans', sans-serif"
      />
    </Box>
  );
}
