import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input } from '@nextui-org/react';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        'https://your-laravel-backend.com/api/activities'
      );
      setActivities(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (id: any, field: any, value: any) => {
    try {
      await axios.put(`https://your-laravel-backend.com/api/activities/${id}`, {
        [field]: value,
      });
      // Optionally, you can update the state or show a success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `https://your-laravel-backend.com/api/activities/${id}`
      );
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <Table>
        <thead>
          <tr>
            <th>Akademik Faaliyet Türü</th>
            <th>Faaliyet Id</th>
            <th>Faaliyet</th>
            <th>Değer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>
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
              </td>
              <td>
                <Input
                  type='text'
                  value={activity.activity_id}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'activity_id', e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type='textarea'
                  value={activity.description}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'description', e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  type='number'
                  value={String(activity.point)}
                  onChange={(e) =>
                    handleUpdate(activity.id, 'point', e.target.value)
                  }
                />
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(activity.id)}
                  color='danger'
                  variant='solid'
                >
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ActivitiesPage;
