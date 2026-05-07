import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { CheckIco, COLORS } from '../../../atoms';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const OnboardingStep3Socials = ({ onNext }: { onNext: () => void }) => {
  const [connected, setConnected] = useState<string[]>([]);
  const toggle = (k: string) =>
    setConnected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const platforms = [
    {
      key: 'whatsapp',
      label: 'WhatsApp Business',
      color: '#25D366',
      icon: <FaWhatsapp size={20} />,
    },
    {
      key: 'facebook',
      label: 'Facebook Page',
      color: '#1877F2',
      icon: <FaFacebook size={20} />,
    },
    {
      key: 'instagram',
      label: 'Instagram Business',
      color: '#E1306C',
      icon: <FaInstagram size={20} />,
    },
  ];
  return (
    <VStack gap="0" align="stretch">
      <Text fontSize="22px" fontWeight="900" color="gray.800" mb="4px">
        Connect your socials
      </Text>
      <Text fontSize="13px" color="gray.500" mb="24px">
        Track leads from all your platforms automatically
      </Text>
      <VStack gap="10px" align="stretch" mb="20px">
        {platforms.map((p) => {
          const active = connected.includes(p.key);
          return (
            <Flex
              key={p.key}
              align="center"
              justify="space-between"
              p="14px"
              borderRadius="12px"
              border="2px solid"
              borderColor={active ? p.color : 'gray.200'}
              bg={active ? `${p.color}08` : 'white'}
              cursor="pointer"
              onClick={() => toggle(p.key)}
            >
              <HStack gap="12px">
                <Flex
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg={p.color}
                  align="center"
                  justify="center"
                >
                  <Text fontSize="11px" color="white" fontWeight="900">
                    {p.icon}
                  </Text>
                </Flex>
                <Text fontSize="13px" fontWeight="700" color="gray.800">
                  {p.label}
                </Text>
              </HStack>
              <Flex
                w="22px"
                h="22px"
                borderRadius="50%"
                bg={active ? '#C6F6D5' : 'gray.100'}
                align="center"
                justify="center"
                color={active ? '#276749' : 'gray.300'}
              >
                <CheckIco />
              </Flex>
            </Flex>
          );
        })}
      </VStack>
      <Button
        bg={COLORS.primary}
        color="white"
        borderRadius="10px"
        fontSize="13px"
        fontWeight="700"
        h="44px"
        _hover={{ bg: COLORS.primaryDark }}
        onClick={onNext}
      >
        Continue
      </Button>
    </VStack>
  );
};
