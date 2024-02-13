'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Input,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import NavbarComponent from '@/components/Navbar';

const CoefficientSettingsPage = () => {
  const [coefficients, setCoefficients] = useState<Coefficient[]>([]);

  useEffect(() => {
    fetchCoefficients();
  }, []);

  const fetchCoefficients = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + '/coefficients'
      ); // Your Laravel backend API endpoint
      setCoefficients(response.data.coefficients);
    } catch (error) {
      console.error('Error fetching coefficients:', error);
    }
  };

  const handleUpdateCoefficient = (id: number, value: number) => {
    // Update the state's values
    setCoefficients((prevCoefficients) =>
      prevCoefficients.map((coefficient) =>
        coefficient.id === id ? { ...coefficient, value } : coefficient
      )
    );

    // Perform the update request to the backend
    // This part will depend on your specific implementation
  };
  const handleSubmit = async (coefficientId: number, updatedValue: number) => {
    try {
      // Send a PUT request to update the coefficient value
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/coefficients/${coefficientId}`,
        { id: coefficientId, value: updatedValue }
      );

      // Optionally, you can show a success message or perform other actions upon successful update
      console.log(`Coefficient ${coefficientId} updated successfully`);
    } catch (error) {
      console.error('Error updating coefficient:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className='container mx-auto py-4 px-8'>
        <div className='text-3xl font-bold m-4'>Katsayı Ayarları</div>
        <Table>
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Value</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {coefficients?.map((coefficient) => (
              <TableRow key={coefficient.id}>
                <TableCell>{coefficient.id}</TableCell>
                <TableCell>
                  <Input
                    type='number'
                    step='0.01'
                    value={String(coefficient.value)}
                    onChange={(e) =>
                      handleUpdateCoefficient(
                        coefficient.id,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant='solid'
                    color='secondary'
                    onClick={() =>
                      handleSubmit(coefficient.id, coefficient.value)
                    }
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CoefficientSettingsPage;
