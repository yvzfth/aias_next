"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableColumn, Input, Button } from '@nextui-org/react';



interface Coefficient {
    id: number;
    value: number;
}


export default function CoefficientPage() {
    const [coefficients, setCoefficients] = useState<Coefficient[]>([]);
    const [newValues, setNewValues] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        axios.get<{ coefficients: Coefficient[] }>('/api/coefficients')
            .then(response => {
                setCoefficients(response.data.coefficients);
                const initialNewValues: { [key: number]: string } = {};
                response.data.coefficients.forEach(coeff => {
                    initialNewValues[coeff.id] = '';
                });
                setNewValues(initialNewValues);
            })
            .catch(error => {
                console.error('Error fetching coefficients: ', error);
            });
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const value = event.target.value;
        setNewValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const updateCoefficient = (id: number) => {
        axios.put<{ coefficient: Coefficient }>(`/api/coefficients/${id}`, { value: newValues[id] })
            .then(response => {
                const updatedCoefficients = coefficients.map(coeff => {
                    if (coeff.id === id) {
                        return response.data.coefficient;
                    }
                    return coeff;
                });
                setCoefficients(updatedCoefficients);
                setNewValues(prevValues => ({
                    ...prevValues,
                    [id]: '',
                }));
            })
            .catch(error => {
                console.error('Error updating coefficient: ', error);
            });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            <h1 className="text-3xl font-bold mb-4">Katsayılar</h1>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Katsayı Değeri</TableColumn>
                            <TableColumn>İşlem</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coefficients.map((coeff) => (
                            <TableRow key={coeff.id}>
                                <TableColumn>{coeff.id}</TableColumn>
                                <TableColumn>{coeff.value}</TableColumn>
                                <TableColumn>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input
                                        
                                            type="number"
                                            step="0.01"
                                            value={newValues[coeff.id]}
                                            onChange={(event) => handleInputChange(event, coeff.id)}
                                            style={{ width: '6rem', marginRight: '0.5rem' }}
                                        />
                                        <Button
                                            onClick={() => updateCoefficient(coeff.id)}
                                            color="primary"
                                            
                                        >
                                            Güncelle
                                        </Button>
                                    </div>
                                </TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}