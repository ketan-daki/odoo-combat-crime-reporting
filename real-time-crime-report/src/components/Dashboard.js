
import React from 'react';


import MapComponent from './MapComponent';
import Footer from './Footer';
import WithSubnavigation from './ResNavbar';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import RegisterCrime from './RegisterCrime';

function Dashboard() {
  return (
    <ChakraProvider>
      <div width="100%"  class="h-100">
      <WithSubnavigation />

      <Grid
        h={"93vh"} width={"100%"}
        templateColumns='repeat(5, 1fr)'
      >
        <GridItem colSpan={1}>
          <RegisterCrime />
        </GridItem>

        <GridItem colSpan={4}   height={"100%"}>
          <MapComponent />
        </GridItem>
        {/* <GridItem colSpan={5} area={'footer'}>
          <Footer />

        </GridItem> */}
      </Grid>
      </div>
    </ChakraProvider>
  );
}

export default Dashboard;
