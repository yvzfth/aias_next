import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const ApplicationForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <Input name='id' placeholder='ID' type='number' required />
        <Input name='name' placeholder='Name' type='text' required />
        <Input name='surname' placeholder='Surname' type='text' required />
        <Input name='email' placeholder='Email' type='email' />
        <Input name='title' placeholder='Title' type='text' required />
        <Input name='faculty' placeholder='Faculty' type='text' required />
        <Input
          name='department'
          placeholder='Department'
          type='text'
          required
        />
        <Input name='basic_field' placeholder='Basic Field' type='text' />
        <Input
          name='scientific_field'
          placeholder='Scientific Field'
          type='text'
        />
        <Select
          name='academic_activity_type'
          placeholder='Academic Activity Type'
          required
        >
          <SelectItem key={'research'} value='research'>
            Research
          </SelectItem>
          <SelectItem key={'teaching'} value='teaching'>
            Teaching
          </SelectItem>
          <SelectItem key={'administrative'} value='administrative'>
            Administrative
          </SelectItem>
        </Select>
        <Input name='activity' placeholder='Activity' type='text' required />
        <Input name='work_name' placeholder='Work Name' type='text' />
        <Input name='doi_number' placeholder='DOI Number' type='text' />
        <Input name='persons' placeholder='Persons' type='number' required />
        <Input name='coefficient' placeholder='Coefficient' type='number' />
        <Input
          name='incentive_point'
          placeholder='Incentive Point'
          type='number'
        />
        <Input name='user_id' placeholder='User ID' type='number' />
        <Input name='folder_uuid' placeholder='Folder UUID' type='text' />
        <Input name='folder_path' placeholder='Folder Path' type='text' />
        <Input name='total_size' placeholder='Total Size' type='number' />
        <Input name='onay_durum' placeholder='Onay Durum' type='text' />
        <Input
          name='submission_period'
          placeholder='Submission Period'
          type='text'
        />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default ApplicationForm;
