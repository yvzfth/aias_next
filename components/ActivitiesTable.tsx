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

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/activities`
      );
      setActivities(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (id: any, field: any, value: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/activities/${id}`,
        {
          [field]: value,
        }
      );
      // Optionally, you can update the state or show a success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/activities/${id}`
      );
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container pb-8 px-8 mx-auto'>
      <div className='text-3xl font-bold pl-4 mb-4'>Kayıtlı Faaliyetler</div>
      <Table>
        <TableHeader>
          <TableColumn>Akademik Faaliyet Türü</TableColumn>
          <TableColumn>Faaliyet Id</TableColumn>
          <TableColumn>Faaliyet</TableColumn>
          <TableColumn>Değer</TableColumn>
          <TableColumn>{''}</TableColumn>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                <Input
                  type='text'
                  value={activity.academic_activity_type}
                  onChange={(e) =>
                    handleUpdate(
                      activity.id,
                      'academic_activity_type',
                      e.target.value
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type='text'
                  value={activity.activity_id}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'activity_id', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type='textarea'
                  value={activity.description}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'description', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type='number'
                  value={String(activity.point)}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'point', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(activity.id)}
                  color='danger'
                  variant='solid'
                >
                  Sil
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivitiesPage;
