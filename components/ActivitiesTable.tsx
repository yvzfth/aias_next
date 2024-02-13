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
import NewActivityForm from './NewActivityForm';

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

  const handleUpdate = async (updatedActivity: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/activities/${updatedActivity.id}`,
        updatedActivity
      );
      // Optionally, you can update the state or show a success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/activities/${id}`)
        .then((e) =>
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== id)
          )
        );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleChange = (e: any, activity: Activity) => {
    const { value, name } = e.target;
    setActivities((prevActivities) => {
      return prevActivities.map((prevActivity) => {
        if (prevActivity.id === activity.id) {
          return { ...prevActivity, [name]: value };
        }
        return prevActivity;
      });
    });
  };

  return (
    <div className='container p-8 mx-auto'>
      <div className='flex justify-between px-4 mb-4'>
        <div className='text-3xl font-bold '>Kayıtlı Faaliyetler</div>
        <NewActivityForm />
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Akademik Faaliyet Türü</TableColumn>
          <TableColumn>Faaliyet Id</TableColumn>
          <TableColumn>Faaliyet</TableColumn>
          <TableColumn>Değer</TableColumn>
          <TableColumn>{''}</TableColumn>
          <TableColumn>{''}</TableColumn>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id} aria-label='Faaliyet'>
              <TableCell aria-label='Akademik Faaliyet Türü'>
                <Input
                  type='text'
                  name='academic_activity_type'
                  value={activity.academic_activity_type}
                  onChange={(e) => handleChange(e, activity)}
                  aria-label='Akademik Faaliyet Türü'
                />
              </TableCell>
              <TableCell aria-label='Faaliyet Id'>
                <Input
                  type='text'
                  name='activity_id'
                  value={activity.activity_id}
                  onChange={(e) => handleChange(e, activity)}
                  aria-label='Faaliyet Id'
                />
              </TableCell>
              <TableCell aria-label='Faaliyet Adı'>
                <Input
                  type='textarea'
                  name='description'
                  value={activity.description}
                  onChange={(e) => handleChange(e, activity)}
                  aria-label='Faaliyet Adı'
                />
              </TableCell>
              <TableCell aria-label='Faaliyet Değeri'>
                <Input
                  type='number'
                  name='point'
                  value={String(activity.point)}
                  onChange={(e) => handleChange(e, activity)}
                  aria-label='Faaliyet Değeri'
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleUpdate(activity)}
                  color='secondary'
                  variant='solid'
                >
                  Güncelle
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(activity.id)}
                  color='danger'
                  variant='solid'
                  aria-label='Sil'
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
