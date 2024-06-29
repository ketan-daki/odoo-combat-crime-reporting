import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Box, Grid } from '@chakra-ui/react';
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [15, 10, 4, 7, 3, 8, 12],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={4} height={"100%"} display={"block"}>
      <Grid  textAlign={"center"} margin={"auto"}  width={"100%"} templateColumns={{ base: '2fr', md: 'repeat(2, 2fr)' }} gap={6} display={"inline-flex"}>
      <Box  width={"35%"}  as={"div"}>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Votes Chart' },
                
              },
              responsive: true,
            }}
          />
        </Box>
           
        
        <Box marginLeft={"20px"}  width={"55%"}  as={"div"}>
          <Line
            data={lineData}
            options={{
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Revenue Chart' },
              },
              responsive: true,
            }}
          />
        </Box>
      </Grid>
      <Grid width={"80%"} textAlign={"center"} margin={"auto"} templateColumns="1fr" gap={6} mt={6}>
      <Box  as={"div"}>
              <Bar
                data={barData}
                options={{
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Sales Chart' },
                  },
                  responsive: true,
                }}
              />
            </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
