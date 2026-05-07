import { Box, Flex, HStack, Input, Text } from '@chakra-ui/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { COLORS } from '../../atoms';

type FilterOpt =
  | 'All'
  | 'Inspected'
  | 'Tokunbo'
  | 'Brand New'
  | 'Nigerian Used';
type SortOpt = 'Newest' | 'Price ↑' | 'Price ↓' | 'Top Rated';

export function HeaderPanel({
  open,
  onClose,
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  current,
  total,
}: {
  open: boolean;
  onClose: () => void;
  search: string;
  setSearch: (v: string) => void;
  filter: FilterOpt;
  setFilter: (v: FilterOpt) => void;
  sort: SortOpt;
  setSort: (v: SortOpt) => void;
  current: number;
  total: number;
}) {
  return (
    <>
      {open && <Box position="fixed" inset={0} zIndex={98} onClick={onClose} />}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={99}
        bg={open ? 'rgba(0,0,0,0.92)' : 'transparent'}
        backdropFilter={open ? 'blur(16px)' : 'none'}
        pt={open ? '52px' : '14px'}
        px="16px"
        pb={open ? '16px' : 0}
        transition="all 0.25s"
        pointerEvents="none"
      >
        {/* Always-visible bar */}
        <Flex justify="space-between" align="center" pointerEvents="all">
          <Text
            fontSize="22px"
            fontWeight={900}
            color="white"
            bg="blackAlpha.400"
            borderRadius="9px"
            px="10px"
            py="3px"
          >
            Marketplace
          </Text>
          <HStack gap="8px">
            <Box
              as="button"
              onClick={onClose}
              display="flex"
              alignItems="center"
              gap="6px"
              marginBottom={20}
              bg="blackAlpha.600"
              border="1px solid"
              borderColor="whiteAlpha.300"
              borderRadius="99px"
              px="13px"
              py="7px"
              color={COLORS.white}
              cursor="pointer"
              fontSize="12px"
              fontWeight={700}
              _hover={{ bg: 'blackAlpha.800' }}
            >
              {open ? <FaTimes size={20} /> : <FaSearch size={20} />}
            </Box>
          </HStack>
        </Flex>

        {/* Expanded content */}
        {open && (
          <Box mt="14px" pointerEvents="all">
            {/* Search */}
            <Flex
              align="center"
              gap="8px"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="10px"
              px="14px"
              h="42px"
              mb="10px"
            >
              <Text fontSize="15px">
                <FaSearch color="#fff" />
              </Text>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Make, model, location..."
                bg="transparent"
                border="none"
                outline="none"
                color="white"
                fontSize="14px"
                _placeholder={{ color: 'whiteAlpha.400' }}
                _focus={{ boxShadow: 'none' }}
                p={0}
              />
            </Flex>

            {/* Filter chips */}
            <Flex
              gap="7px"
              overflowX="auto"
              pb="10px"
              css={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {(
                [
                  'All',
                  'Inspected',
                  'Tokunbo',
                  'Brand New',
                  'Nigerian Used',
                ] as FilterOpt[]
              ).map((f) => (
                <Box
                  key={f}
                  as="button"
                  onClick={() => setFilter(f)}
                  px="12px"
                  py="5px"
                  borderRadius="99px"
                  flexShrink={0}
                  bg={filter === f ? '#6C63FF' : 'whiteAlpha.100'}
                  border="1px solid"
                  borderColor={filter === f ? '#6C63FF' : 'whiteAlpha.200'}
                  color={filter === f ? 'white' : 'whiteAlpha.700'}
                  fontSize="12px"
                  fontWeight={600}
                  cursor="pointer"
                  _hover={{ bg: filter === f ? '#5B54E8' : 'whiteAlpha.200' }}
                >
                  {f}
                </Box>
              ))}
            </Flex>

            {/* Sort chips */}
            <Flex
              align="center"
              gap="7px"
              overflowX="auto"
              css={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <Text
                fontSize="12px"
                fontWeight={700}
                color="whiteAlpha.500"
                flexShrink={0}
              >
                Sort:
              </Text>
              {(['Newest', 'Price ↑', 'Price ↓', 'Top Rated'] as SortOpt[]).map(
                (o) => (
                  <Box
                    key={o}
                    as="button"
                    onClick={() => setSort(o)}
                    px="11px"
                    py="4px"
                    borderRadius="99px"
                    flexShrink={0}
                    bg={sort === o ? '#6C63FF' : 'whiteAlpha.100'}
                    border="1px solid"
                    borderColor={sort === o ? '#6C63FF' : 'whiteAlpha.200'}
                    color={sort === o ? 'white' : 'whiteAlpha.600'}
                    fontSize="11px"
                    fontWeight={600}
                    cursor="pointer"
                    _hover={{ bg: sort === o ? '#5B54E8' : 'whiteAlpha.200' }}
                  >
                    {o}
                  </Box>
                ),
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}
