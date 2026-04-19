import React, { useState } from 'react';
import { Box, Grid, VStack, Text, Input, Textarea, Button, Flex } from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { UploadIco } from '../atoms/icons';

interface ProfileFormData {
  businessName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  bio: string;
  logo?: string;
}

interface EditProfileFormProps {
  initial: ProfileFormData;
  onSave: (data: ProfileFormData) => void;
}

export const EditProfileForm = ({ initial, onSave }: EditProfileFormProps) => {
  const [form, setForm] = useState<ProfileFormData>(initial);
  const set = (k: keyof ProfileFormData, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <Box bg="white" borderRadius="16px" p="22px" boxShadow="0 2px 10px rgba(0,0,0,0.05)" mb="16px">
      <Text fontWeight="800" fontSize="15px" color="gray.800" mb="4px">Dealership Profile</Text>
      <Text fontSize="12px" color="gray.400" mb="20px">Your public-facing business information</Text>

      {/* Logo upload */}
      <Flex align="center" gap="16px" mb="24px">
        <Box w="80px" h="80px" borderRadius="16px" bg="gray.100" border="2px dashed"
          borderColor="gray.300" display="flex" alignItems="center" justifyContent="center"
          cursor="pointer" _hover={{ borderColor: COLORS.primary }}>
          {form.logo
            ? <img src={form.logo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
            : <Box color="gray.400"><UploadIco /></Box>}
        </Box>
        <Box>
          <Text fontSize="13px" fontWeight="700" color="gray.700">Dealership Logo</Text>
          <Text fontSize="11px" color="gray.400" mt="2px">PNG or JPG · Max 2MB · 200×200px recommended</Text>
        </Box>
      </Flex>

      <Grid templateColumns="1fr 1fr" gap="14px">
        {[
          { label: 'Business Name', key: 'businessName', placeholder: 'e.g. Eko Motors Ltd' },
          { label: 'Owner Name', key: 'ownerName', placeholder: 'e.g. Chukwudi Obi' },
          { label: 'Phone', key: 'phone', placeholder: '+234 801 234 5678' },
          { label: 'WhatsApp Number', key: 'whatsapp', placeholder: '+234 801 234 5678' },
          { label: 'Email', key: 'email', placeholder: 'dealer@ekomot.com' },
          { label: 'Address', key: 'address', placeholder: '12 Broad St, Lagos Island' },
        ].map(f => (
          <VStack key={f.key} align="start" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="gray.600">{f.label}</Text>
            <Input placeholder={f.placeholder} value={(form as any)[f.key]}
              onChange={e => set(f.key as keyof ProfileFormData, e.target.value)}
              borderRadius="10px" fontSize="13px" h="38px"
              border="1px solid" borderColor="gray.200"
              _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
          </VStack>
        ))}
        <VStack align="start" gap="4px" gridColumn="1 / -1">
          <Text fontSize="12px" fontWeight="700" color="gray.600">Bio / Description</Text>
          <Textarea placeholder="Tell buyers about your dealership — specialties, years in business, what makes you different..."
            value={form.bio} onChange={e => set('bio', e.target.value)}
            borderRadius="10px" fontSize="13px" rows={3}
            border="1px solid" borderColor="gray.200"
            _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }} />
        </VStack>
      </Grid>
      <Flex justify="flex-end" mt="18px">
        <Button bg={COLORS.primary} color="white" borderRadius="10px"
          fontSize="13px" fontWeight="700" h="40px" px="24px"
          _hover={{ bg: COLORS.primaryDark }} onClick={() => onSave(form)}>
          Save Changes
        </Button>
      </Flex>
    </Box>
  );
};
