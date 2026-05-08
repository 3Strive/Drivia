import { Box, HStack, Text } from '@chakra-ui/react';
import { CheckIco, CheckIcon, COLORS, SpinnerIcon } from '../../atoms';
import { Platform, PostStatus } from '../../../shared/types';
import { FaCheck } from 'react-icons/fa';

// ─── PLATFORM TOGGLE ─────────────────────────────────────────────────────────
interface PlatformToggleProps {
  platform: Platform;
  selected: boolean;
  status: PostStatus;
  onToggle: () => void;
}

export function PlatformToggle({
  platform,
  selected,
  status,
  onToggle,
}: PlatformToggleProps): JSX.Element {
  const isDone = status === 'success';
  const isPosting = status === 'posting';
  const isError = status === 'error';

  return (
    <Box
      as="button"
      onClick={!isDone ? onToggle : undefined}
      position="relative"
      borderRadius="14px"
      border="2px solid"
      borderColor={selected ? platform.bg : 'gray.150'}
      bg={selected ? `${platform.bg}10` : 'white'}
      p="14px 16px"
      cursor={isDone ? 'default' : 'pointer'}
      transition="all 0.18s"
      _hover={
        !isDone ? { borderColor: platform.bg, bg: `${platform.bg}08` } : {}
      }
      w="100%"
      textAlign="left"
      opacity={isError ? 0.6 : 1}
    >
      <HStack gap="12px">
        {/* Platform icon bubble */}
        <Box
          w="38px"
          h="38px"
          borderRadius="10px"
          bg={platform.bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          flexShrink="0"
          boxShadow={selected ? `0 4px 12px ${platform.bg}55` : 'none'}
          transition="box-shadow 0.18s"
        >
          {isPosting ? <SpinnerIcon /> : platform.icon}
        </Box>

        <Box flex="1">
          <Text fontSize="13px" fontWeight="600" color="gray.800">
            {platform.name}
          </Text>
          <Text
            fontSize="11px"
            color={
              isDone
                ? 'green.500'
                : isError
                  ? 'red.400'
                  : isPosting
                    ? 'gray.400'
                    : platform.connected
                      ? 'green.500'
                      : 'orange.400'
            }
          >
            {isDone
              ? '✓ Posted successfully'
              : isError
                ? 'Failed — tap to retry'
                : isPosting
                  ? 'Posting...'
                  : platform.connected
                    ? 'Connected'
                    : 'Not connected'}
          </Text>
        </Box>

        {/* Checkbox */}
        {!isDone && (
          <Box
            w="20px"
            h="20px"
            borderRadius="6px"
            flexShrink="0"
            border="2px solid"
            borderColor={selected ? COLORS.primary : 'gray.200'}
            bg={selected ? COLORS.primary : 'white'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.15s"
          >
            {selected && <FaCheck size={16} fill={COLORS.white} />}
          </Box>
        )}
        {isDone && (
          <Box
            w="20px"
            h="20px"
            borderRadius="full"
            flexShrink="0"
            bg="green.400"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            <CheckIcon />
          </Box>
        )}
      </HStack>
    </Box>
  );
}
