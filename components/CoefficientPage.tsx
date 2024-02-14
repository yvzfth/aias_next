"use client"

// pages/coefficients.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

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
                // Initialize newValues with empty strings for each coefficient
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
                // Reset the input value after update
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Katsayılar</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Katsayı Değeri</th>
                            <th className="px-4 py-2">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coefficients.map(coeff => (
                            <tr key={coeff.id} className="border-b">
                                <td className="px-4 py-2">{coeff.id}</td>
                                <td className="px-4 py-2">{coeff.value}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={newValues[coeff.id]}
                                            onChange={(event) => handleInputChange(event, coeff.id)}
                                            className="border rounded-l px-2 py-1 w-24"
                                        />
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r" onClick={() => updateCoefficient(coeff.id)}>Güncelle</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}
    