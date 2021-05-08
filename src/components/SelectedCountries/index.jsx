/* eslint-disable react/forbid-prop-types */

import {
  Box, Button, Center, Heading, ListItem, UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function SelectedCountries({ countries, onViewChart, onClear }) {
  return (
    <Box
      position="absolute"
      bg="gray.300"
      borderColor="black"
      width={250}
      bottom={100}
      right={20}
      borderRadius={4}
      padding={4}
    >
      <Heading size="sm">Países selecionados</Heading>
      <UnorderedList marginBottom={4} marginTop={4}>
        {countries
          .sort((a, b) => a.NAME.localeCompare(b.NAME))
          .map((country) => <ListItem key={country.ISO_A3}>{country.NAME}</ListItem>)}
      </UnorderedList>
      <Center>
        <Button size="lg" colorScheme="blue" onClick={onViewChart}>Visualizar gráfico</Button>
      </Center>
      <Center marginTop={4}>
        <Button variant="link" onClick={onClear}>Limpar seleção</Button>
      </Center>
    </Box>
  );
}

SelectedCountries.propTypes = {
  countries: PropTypes.array.isRequired,
  onViewChart: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
