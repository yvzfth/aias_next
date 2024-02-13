'use client';
import React from 'react';
import NewActivityForm from '@/components/NewActivityForm';
import ActivitiesTable from '@/components/ActivitiesTable';
const AcitivitySettings = () => {
  return (
    <div>
      <NewActivityForm />
      <ActivitiesTable />
    </div>
  );
};

export default AcitivitySettings;
