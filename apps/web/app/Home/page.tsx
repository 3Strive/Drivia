import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { BellIcon, Search } from 'lucide-react';
import { FC } from 'react';
import GeneralLayout from '../components/organism/general-layout';

const Home: FC = () => {
  return (
    <GeneralLayout>
      {/* HEADER */}

      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Main Dashboard</Heading>

        <HStack gap={4}>
          <Box position="relative">
            <Search
              size={18}
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
              }}
            />

            <Input pl={8} placeholder="Search..." bg="white" w="260px" />
          </Box>

          <BellIcon fill="white" />

          {/* <Avatar size="sm" /> */}
        </HStack>
      </Flex>

      {/* STATS */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={4} mb={6}>
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </SimpleGrid>

      {/* MAIN GRID */}
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '2fr 1fr',
        }}
        gap={6}
      >
        {/* LEFT SIDE */}
        <VStack gap={6} align="stretch">
          {/* Revenue Chart */}
          <Card>
            <Heading size="sm" mb={4}>
              This Month
            </Heading>

            {/* chart placeholder */}
            <Box h="200px" bg="gray.100" rounded="lg" />
          </Card>

          {/* Share Table */}
          <Card>
            <Heading size="sm" mb={4}>
              Share Table
            </Heading>

            {/* <Table size="sm">
            <TableBody>

              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Progress</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>

              <Tbody>

                {table.map((row) => (
                  <Tr key={row.name}>
                    <Td>{row.name}</Td>

                    <Td>
                      <Progress
                        value={row.progress}
                        rounded="full"
                      />
                    </Td>

                    <Td>{row.date}</Td>

                  </Tr>
                ))}
              </Tbody>

</TableBody>           */}
          </Card>
        </VStack>

        {/* RIGHT SIDE */}
        <VStack gap={6} align="stretch">
          {/* Weekly Revenue */}
          <Card>
            <Heading size="sm" mb={4}>
              Weekly Revenue
            </Heading>

            <Box h="160px" bg="gray.100" rounded="lg" />
          </Card>

          {/* Pie Chart */}
          <Card>
            <Heading size="sm" mb={4}>
              Your Pie Chart
            </Heading>

            <Box h="160px" rounded="lg" bg="gray.100" />
          </Card>
        </VStack>
      </Grid>
    </GeneralLayout>
  );
};

export default Home;

/* ---------- CARD ---------- */

function Card({ children }: any) {
  return (
    <Box bg="white" p={5} rounded="xl" shadow="sm">
      {children}
    </Box>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ label, value, help }: any) {
  return (
    <Card>
      {/* <Stat>

        <StatLabel>
          {label}
        </StatLabel>

        <StatNumber>
          {value}
        </StatNumber>

        <StatHelpText>
          {help}
        </StatHelpText>

      </Stat> */}
    </Card>
  );
}

/* ---------- DATA ---------- */

const stats = [
  {
    label: 'Earnings',
    value: '$350.4',
    help: 'This month',
  },
  {
    label: 'Spend this month',
    value: '$642.39',
    help: '',
  },
  {
    label: 'Sales',
    value: '$574.34',
    help: '+23%',
  },
  {
    label: 'Your Balance',
    value: '$1,000',
    help: '',
  },
  {
    label: 'Projects',
    value: '2935',
    help: '',
  },
];

const table = [
  {
    name: 'Facebook',
    progress: 70,
    date: '24 Jan',
  },
  {
    name: 'Instagram',
    progress: 40,
    date: '10 Feb',
  },
  {
    name: 'WhatsApp',
    progress: 85,
    date: '18 Mar',
  },
];
