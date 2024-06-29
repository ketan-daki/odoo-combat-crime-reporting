import React from 'react';
import BarChart from './BarChart';
// import ResNavbar from './ResNavbar';
import WithSubnavigation from './ResNavbar';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';

function Report() {
  return (
    <div class="row h-100">
      <ChakraProvider>

        <WithSubnavigation/>
        <BarChart/>
      </ChakraProvider>

    </div>
  );
}

export default Report;