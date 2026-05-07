import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Grid,
  HStack,
  VStack,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import { COLORS } from '../atoms/palette';
import { CloseIco, UploadIco } from '../atoms/icons';
import { AddCarForm } from '../../shared/types';
import { FaCar, FaCheckDouble } from 'react-icons/fa';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX 1: Accept AddCarForm instead of CarListing — form state is AddCarForm shape
  onSave: (car: AddCarForm) => void;
}

const STEPS = ['Details', 'Specs', 'Price & Photos', 'Publish'];

const EMPTY_FORM: AddCarForm = {
  make: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  condition: '',
  bodyType: '',
  location: '',
  color: '',
  transmission: '',
  fuelType: '',
  description: '',
  phone: '',
  gradient: 'linear(to-br, #3F51B5, #6C63FF)',
  postedAt: new Date().toLocaleDateString('en-GB'),
  sharedTo: [],
  images: [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
  ],
};

export const AddCarModal = ({ isOpen, onClose, onSave }: AddCarModalProps) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AddCarForm>(EMPTY_FORM);

  if (!isOpen) return null;

  const set = (k: string, v: string) => {
    setForm((p) => ({
      ...p,
      [k]: ['year', 'mileage', 'price'].includes(k)
        ? v === ''
          ? ''
          : Number(v)
        : v,
    }));
  };

  const handleClose = () => {
    setStep(0);
    setForm(EMPTY_FORM);
    onClose();
  };

  return (
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      style={{ backdropFilter: 'blur(4px)' }}
      zIndex={100}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        borderRadius="20px"
        w="560px"
        maxH="90vh"
        overflow="auto"
        boxShadow="0 20px 60px rgba(0,0,0,0.2)"
      >
        {/* Header */}
        <Flex
          p="24px 28px 16px"
          justify="space-between"
          align="center"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Box>
            <Text fontSize="18px" fontWeight="800" color="gray.800">
              Add New Car
            </Text>
            <Text fontSize="12px" color="gray.400">
              Step {step + 1} of {STEPS.length} — {STEPS[step]}
            </Text>
          </Box>
          <Box
            as="button"
            onClick={handleClose}
            color="gray.400"
            _hover={{ color: 'gray.700' }}
          >
            <CloseIco />
          </Box>
        </Flex>

        {/* Step indicator */}
        <HStack gap="0" px="28px" pt="16px">
          {STEPS.map((s, i) => (
            <Flex
              key={s}
              align="center"
              flex={i < STEPS.length - 1 ? '1' : 'none'}
            >
              <Flex
                w="24px"
                h="24px"
                borderRadius="50%"
                align="center"
                justify="center"
                bg={i <= step ? COLORS.primary : 'gray.100'}
                color={i <= step ? 'white' : 'gray.400'}
                fontSize="11px"
                fontWeight="800"
                flexShrink={0}
              >
                {i + 1}
              </Flex>
              {i < STEPS.length - 1 && (
                <Box
                  flex="1"
                  h="2px"
                  bg={i < step ? COLORS.primary : 'gray.100'}
                  mx="4px"
                />
              )}
            </Flex>
          ))}
        </HStack>

        {/* Body */}
        <Box p="24px 28px">
          {step === 0 && (
            <Grid templateColumns="1fr 1fr" gap="14px">
              {[
                { label: 'Make', key: 'make', placeholder: 'e.g. Toyota' },
                { label: 'Model', key: 'model', placeholder: 'e.g. Camry' },
                { label: 'Year', key: 'year', placeholder: 'e.g. 2021' },
                { label: 'Color', key: 'color', placeholder: 'e.g. Silver' },
              ].map((f) => (
                <VStack key={f.key} align="start" gap="4px">
                  <Text fontSize="12px" fontWeight="700" color="gray.600">
                    {f.label}
                  </Text>
                  <Input
                    placeholder={f.placeholder}
                    value={form[f.key as keyof AddCarForm]?.toString() || ''}
                    onChange={(e) => set(f.key, e.target.value)}
                    borderRadius="10px"
                    fontSize="13px"
                    p={2}
                    h="38px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
                  />
                </VStack>
              ))}
              <VStack align="start" gap="4px">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Body Type
                </Text>
                <chakra.select
                  value={form.bodyType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    set('bodyType', e.target.value)
                  }
                  borderRadius="10px"
                  fontSize="13px"
                  h="38px"
                  border="1px solid"
                  borderColor="gray.200"
                  w="100%"
                >
                  <option value="">Select...</option>
                  {['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupe', 'Van'].map(
                    (b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ),
                  )}
                </chakra.select>
              </VStack>
              <VStack align="start" gap="4px">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Fuel Type
                </Text>
                <chakra.select
                  value={form.fuelType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    set('fuelType', e.target.value)
                  }
                  borderRadius="10px"
                  fontSize="13px"
                  h="38px"
                  border="1px solid"
                  borderColor="gray.200"
                  w="100%"
                >
                  <option value="">Select...</option>
                  {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </chakra.select>
              </VStack>
            </Grid>
          )}

          {step === 1 && (
            <Grid templateColumns="1fr 1fr" gap="14px">
              {[
                {
                  label: 'Mileage (km)',
                  key: 'mileage',
                  placeholder: 'e.g. 45000',
                },
                {
                  label: 'Location',
                  key: 'location',
                  placeholder: 'e.g. Lekki, Lagos',
                },
                {
                  label: 'Phone',
                  key: 'phone',
                  placeholder: 'e.g. 08012345678',
                },
              ].map((f) => (
                <VStack key={f.key} align="start" gap="4px">
                  <Text fontSize="12px" fontWeight="700" color="gray.600">
                    {f.label}
                  </Text>
                  <Input
                    placeholder={f.placeholder}
                    value={form[f.key as keyof AddCarForm]?.toString() || ''}
                    onChange={(e) => set(f.key, e.target.value)}
                    borderRadius="10px"
                    p={2}
                    fontSize="13px"
                    h="38px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
                  />
                </VStack>
              ))}
              <VStack align="start" gap="4px">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Condition
                </Text>
                <chakra.select
                  value={form.condition}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    set('condition', e.target.value)
                  }
                  borderRadius="10px"
                  fontSize="13px"
                  h="38px"
                  border="1px solid"
                  borderColor="gray.200"
                  w="100%"
                >
                  <option value="">Select...</option>
                  {['Brand New', 'Tokunbo', 'Nigerian Used'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </chakra.select>
              </VStack>
              <VStack align="start" gap="4px">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Transmission
                </Text>
                <chakra.select
                  value={form.transmission}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    set('transmission', e.target.value)
                  }
                  borderRadius="10px"
                  fontSize="13px"
                  h="38px"
                  border="1px solid"
                  borderColor="gray.200"
                  w="100%"
                >
                  <option value="">Select...</option>
                  {['Automatic', 'Manual', 'CVT'].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </chakra.select>
              </VStack>
              <VStack align="start" gap="4px" gridColumn="1 / -1">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Description
                </Text>
                <Textarea
                  placeholder="Describe the car condition, history, extras..."
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  borderRadius="10px"
                  fontSize="13px"
                  p={2}
                  rows={3}
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
                />
              </VStack>
            </Grid>
          )}

          {step === 2 && (
            <VStack gap="14px" align="stretch">
              <VStack align="start" gap="4px">
                <Text fontSize="12px" fontWeight="700" color="gray.600">
                  Asking Price (₦)
                </Text>
                <Input
                  placeholder="e.g. 12500000"
                  value={form.price?.toString() || ''}
                  onChange={(e) => set('price', e.target.value)}
                  borderRadius="10px"
                  fontSize="13px"
                  p={2}
                  h="38px"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{ borderColor: COLORS.primary, boxShadow: 'none' }}
                />
              </VStack>
              <Box
                border="2px dashed"
                borderColor="gray.200"
                borderRadius="14px"
                p="32px"
                textAlign="center"
                cursor="pointer"
                _hover={{
                  borderColor: COLORS.primary,
                  bg: `${COLORS.primary}05`,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  mb="8px"
                  color="gray.300"
                >
                  <UploadIco />
                </Box>
                <Text fontSize="13px" fontWeight="600" color="gray.500">
                  Click to upload photos
                </Text>
                <Text fontSize="11px" color="gray.400" mt="4px">
                  PNG, JPG up to 10MB · Up to 20 photos
                </Text>
              </Box>
            </VStack>
          )}

          {step === 3 && (
            <Box
              display={'flex'}
              flexDir={'column'}
              textAlign="center"
              py="20px"
            >
              <FaCar
                size={30}
                style={{ alignSelf: 'center' }}
                fill={COLORS.primary}
              />
              <Text fontSize="18px" fontWeight="800" color="gray.800" mb="6px">
                Ready to Publish!
              </Text>
              <Text fontSize="13px" color="gray.500" mb="20px">
                {form.year} {form.make} {form.model} will go live on the Drivia
                marketplace. Post will be shared to your Social Media Platforms
              </Text>
              <Box bg="gray.50" borderRadius="12px" p="16px" textAlign="left">
                {/* FIX 5: Removed the stray [''] entry that caused a missing key warning */}
                {(
                  [
                    ['Make / Model', `${form.make} ${form.model}`],
                    ['Year', form.year?.toString()],
                    ['Price', `₦${Number(form.price || 0).toLocaleString()}`],
                    ['Body Type', form.bodyType],
                    ['Transmission', form.transmission],
                    ['Condition', form.condition],
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <Flex
                    key={k}
                    justify="space-between"
                    py="6px"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _last={{ border: 'none' }}
                  >
                    <Text fontSize="12px" color="gray.500">
                      {k}
                    </Text>
                    <Text fontSize="12px" fontWeight="700" color="gray.800">
                      {v || '—'}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Flex
          p="16px 28px 24px"
          gap="10px"
          justify="flex-end"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          {step > 0 && (
            <Button
              variant="ghost"
              borderRadius="10px"
              onClick={() => setStep((s) => s - 1)}
              fontSize="13px"
              fontWeight="600"
              color="gray.600"
            >
              Back
            </Button>
          )}
          <Button
            bg={step === STEPS.length - 1 ? COLORS.primaryDark : COLORS.primary}
            color="white"
            borderRadius="10px"
            fontSize="13px"
            fontWeight="700"
            px="24px"
            _hover={{ opacity: 0.9 }}
            onClick={() => {
              if (step < STEPS.length - 1) {
                setStep((s) => s + 1);
              } else {
                onSave(form);
                handleClose();
              }
            }}
          >
            {step === STEPS.length - 1 ? (
              <HStack gap="6px">
                <FaCheckDouble color={COLORS.white} size={16} />
                <span>Publish Listing</span>
              </HStack>
            ) : (
              'Continue'
            )}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
