import React, { useState } from 'react';
import { Box, Flex, Text, Textarea, HStack, Button, Input, Grid } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { UploadIco, ShareIco } from '../atoms/icons';

const PLATFORMS = [
  { key: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'f' },
  { key: 'instagram', label: 'Instagram', color: '#E1306C', icon: 'ig' },
  { key: 'whatsapp', label: 'WhatsApp Status', color: '#25D366', icon: 'W' },
];

interface PostComposerProps {
  onPublish: (caption: string, platforms: string[], scheduleAt: string) => void;
}

export const PostComposer = ({ onPublish }: PostComposerProps) => {
  const [caption, setCaption] = useState('');
  const [selected, setSelected] = useState<string[]>(['facebook', 'instagram']);
  const [scheduleAt, setScheduleAt] = useState('');
  const [images] = useState<string[]>([]);

  const toggle = (key: string) =>
    setSelected(s => s.includes(key) ? s.filter(k => k !== key) : [...s, key]);

  return (
    <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
      <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">New Post</Text>
      <Text fontSize="12px" color="gray.400" mb="16px">Create and schedule a listing post</Text>

      <Grid templateColumns="1fr 1fr" gap="16px">
        <Box>
          {/* Platform select */}
          <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
            Post To
          </Text>
          <HStack gap="8px" mb="14px" flexWrap="wrap">
            {PLATFORMS.map(p => {
              const active = selected.includes(p.key);
              return (
                <Flex key={p.key} as="button" align="center" gap="6px"
                  px="10px" py="6px" borderRadius="8px" border="2px solid"
                  borderColor={active ? p.color : 'gray.200'}
                  bg={active ? `${p.color}10` : 'white'}
                  onClick={() => toggle(p.key)} transition="all 0.15s">
                  <Flex w="18px" h="18px" borderRadius="4px" bg={active ? p.color : 'gray.200'}
                    align="center" justify="center">
                    <Text fontSize="7px" color="white" fontWeight="900">{p.icon}</Text>
                  </Flex>
                  <Text fontSize="11px" fontWeight="700" color={active ? p.color : 'gray.400'}>
                    {p.label}
                  </Text>
                </Flex>
              );
            })}
          </HStack>

          {/* Caption */}
          <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
            Caption
          </Text>
          <Textarea
            placeholder="🚗 2021 Toyota Camry XLE · ₦12.5M · Low mileage · Full leather interior. DM to book a viewing!"
            value={caption} onChange={e => setCaption(e.target.value)}
            borderRadius="10px" fontSize="13px" rows={5}
            border="1px solid" borderColor="gray.200" mb="4px"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
          />
          <Text fontSize="11px" color={caption.length > 2000 ? 'red.400' : 'gray.400'} mb="14px">
            {caption.length}/2200 characters
          </Text>

          {/* Schedule */}
          <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
            Schedule (optional)
          </Text>
          <Input type="datetime-local" value={scheduleAt} onChange={e => setScheduleAt(e.target.value)}
            borderRadius="10px" fontSize="12px" h="36px" border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} mb="16px" />

          <Button bg={COLORS.primary} color="white" borderRadius="10px"
            fontSize="13px" fontWeight="700" h="38px" w="100%"
            _hover={{ bg: COLORS.primaryDark }}
            display="flex" alignItems="center" justifyContent="center" gap="6px"
            onClick={() => onPublish(caption, selected, scheduleAt)}>
            <ShareIco /> {scheduleAt ? 'Schedule Post' : 'Post Now'}
          </Button>
        </Box>

        {/* Photo upload */}
        <Box>
          <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" mb="8px">
            Photos / Video
          </Text>
          <Box border="2px dashed" borderColor="gray.200" borderRadius="14px"
            p="24px" textAlign="center" cursor="pointer" h="200px"
            display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            _hover={{ borderColor: COLORS.primary, bg: `${COLORS.primary}04` }}>
            <Box color="gray.300" mb="8px"><UploadIco /></Box>
            <Text fontSize="13px" fontWeight="600" color="gray.500">Upload photos</Text>
            <Text fontSize="11px" color="gray.400" mt="4px">Up to 10 images</Text>
          </Box>
          {images.length > 0 && (
            <Grid templateColumns="repeat(3, 1fr)" gap="6px" mt="8px">
              {images.map((img, i) => (
                <Box key={i} h="60px" borderRadius="8px" overflow="hidden">
                  <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Grid>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
