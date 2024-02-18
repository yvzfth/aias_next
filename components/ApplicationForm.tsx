import { FacultiesAndDepartments, academicTitles, next12Months } from '@/utils';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { MdAssignmentAdd } from 'react-icons/md';

import { InputText } from 'primereact/inputtext';

import { Accordion, AccordionTab } from 'primereact/accordion';
import FileUpload from './FileUpload';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import axios from 'axios';

const ApplicationForm = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const defaultApplication: Application = {
    submission_period: '',
    name: user?.firstname ?? '',
    surname: user?.lastname ?? '',
    email: user?.email ?? '',
    title: '',
    faculty: '',
    department: '',
    work_name: '',
    basic_field: '',
    scientific_field: '',
    persons: '',
    academic_activity_type: '',
    activity: '',
    doi_number: '',
    file: null,
  };
  const [file, setFile] = useState(null);
  const [accordionItems, setAccordionItems] = useState<number[]>([1]);
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [departments, setDepartments] = useState([] as { value: string }[]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')!);
    setUser(userData);
    if (userData) {
      setApplicationList([defaultApplication]);
    }
  }, [user?.email]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setApplicationList((prevApplicationList) => {
      const updatedApplicationList = [...prevApplicationList];
      updatedApplicationList[index - 1] = {
        ...updatedApplicationList[index - 1],
        [name]: value,
      };
      return updatedApplicationList;
    });
  };
  const handleDropdownChange = (event: DropdownChangeEvent, index: number) => {
    const { name, value } = event.target;

    setApplicationList((prevApplicationList) => {
      const updatedApplicationList = [...prevApplicationList];
      updatedApplicationList[index - 1] = {
        ...updatedApplicationList[index - 1],
        [name]: value,
      };
      return updatedApplicationList;
    });
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      console.log('Selected File:', selectedFile);
      setApplicationList((prevApplicationList) => {
        return prevApplicationList.map((application, i) => {
          if (i === index - 1) {
            // Update the file property for the specific application
            return {
              ...application,
              file: selectedFile,
            };
          }
          return application; // Return unchanged application for other indexes
        });
      });
      console.log('ApplicationList File', applicationList?.at(index - 1)?.file);
    }
  };
  const handleRemoveFile = (item: number) => {
    setApplicationList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[item - 1] = {
        ...updatedFormDataList[item - 1],
        file: null,
      };
      return updatedFormDataList;
    });
  };

  const handleAddAccordionItem = () => {
    // Add a new FormData object to the formDataList array
    setApplicationList((prevApplicationList) => [
      ...prevApplicationList,
      defaultApplication,
    ]);
    // Add a new accordion item
    setAccordionItems((prevAccordionItems) => [
      ...prevAccordionItems,
      prevAccordionItems.length + 1,
    ]);
  };

  const handleRemoveAccordionItem = (index: number) => {
    // Remove the FormData object at the specified index from the formDataList array
    setApplicationList((prevApplicationList) =>
      prevApplicationList.filter((_, i) => i !== index)
    );
    // Remove the accordion item at the specified index
    setAccordionItems((prevAccordionItems) =>
      prevAccordionItems.filter((item) => item !== index)
    );
  };

  const handleFacultyChange = (value: string, index: number) => {
    setApplicationList((prevApplicationList) => {
      const updatedApplicationList = [...prevApplicationList];
      updatedApplicationList[index - 1] = {
        ...updatedApplicationList[index - 1],
        faculty: value,
      };
      return updatedApplicationList;
    });
    setDepartments(
      FacultiesAndDepartments.find((item) => item.faculty === value)
        ?.departments ?? []
    );
  };

  const handleSubmit = async (formId: number) => {
    // Find the form data with the specified ID
    const formData = applicationList.find((data, index) => index === formId);

    // Check if formData is found
    if (formData) {
      try {
        // Create a new FormData object
        const formDataToSubmit = new FormData();

        // Append form data fields to formDataToSubmit
        Object.entries(formData).forEach(([key, value]) => {
          // Exclude the 'file' field because it needs to be handled separately
          if (key !== 'file') {
            formDataToSubmit.append(key, value as string);
          }
        });

        // Append the file data separately
        if (formData.file) {
          formDataToSubmit.append('file', formData.file);
        }

        // Submit formDataToSubmit to server
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + '/submissions',
          formDataToSubmit
        );

        if (
          response.status !== 200 &&
          response.status !== 201 &&
          response.status !== 204
        ) {
          throw new Error('Network response was not ok');
        }

        // Handle successful submission
        const responseData = await response.data;
        console.log('Submitted Form Data:', responseData);

        // Return the submitted data
        return responseData;
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }
    } else {
      console.error('Form data not found for ID:', formId);
      // Handle error if form data is not found
    }
  };

  const handleSubmitAll = async () => {
    try {
      for (let i = 0; i < accordionItems.length; i++) {
        const form = document.getElementById(
          `form-${accordionItems[i]}`
        ) as HTMLFormElement;
        await handleSubmit(i);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [academicActivityTypes, setAcademicActivityTypes] = useState<string[]>(
    []
  );
  const [filteredActivities, setFilteredActivities] = useState<
    { id: string; description: string }[]
  >([]);

  useEffect(() => {
    const fetchAcademicActivityTypes = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + '/activities'
        );
        const data = await response.json();
        setActivities(data);
        // Convert array to Set to remove duplicatesf
        const uniqueActivityTypes = new Set<string>(
          data?.map((item: any) => item?.academic_activity_type)
        );
        // Convert Set back to array
        setAcademicActivityTypes(Array.from(uniqueActivityTypes));
      } catch (error) {
        console.error('Error fetching academic activity types:', error);
      }
    };

    fetchAcademicActivityTypes();
  }, []);
  // Function to handle academic activity type change
  const handleAcademicActivityTypeChange = (
    selectedType: string,
    index: number
  ) => {
    // setSelectedActivityType(selectedType);
    setApplicationList((prevApplicationList) => {
      const updatedApplicationList = [...prevApplicationList];
      updatedApplicationList[index - 1] = {
        ...updatedApplicationList[index - 1],
        academic_activity_type: selectedType,
      };
      return updatedApplicationList;
    });
    // Filter activity IDs based on selected academic activity type
    const filteredActivities = activities
      .filter((item: any) => item.academic_activity_type === selectedType)
      .map((item: any) => ({
        id: item.activity_id,
        description: item.description,
      }));
    setFilteredActivities(filteredActivities);
  };
  return (
    <Card className='container lg:w-[800px] md:w-[600px] w-[400px] mx-auto my-8 p-10'>
      <Image
        className='mx-auto p-4 w-auto'
        width={150}
        height={66}
        alt='logo'
        src={'/logo-kucuk.png'}
      />
      <div className='text-center pb-6'>
        <p className='opacity-75 '>Akademik Teşvik Başvuru Sistemi</p>
        <p className='opacity-50'>Academic Incentive Application System</p>
      </div>
      <Button
        onClick={handleAddAccordionItem}
        size='lg'
        color='danger'
        startContent={<MdAssignmentAdd />}
        className='absolute w-fit px-8 top-32 right-0 -mr-[8.5rem] hover:-mr-[1.5rem] 
              transition-all duration-300 ease-in-out animate-appearance-in  z-10 text-white font-bold'
      >
        Yeni Başvuru
      </Button>
      <Accordion multiple activeIndex={[0]}>
        {accordionItems.map((item) => (
          <AccordionTab key={item} header={`Başvuru Formu ${item}`}>
            <div className='w-full items-end text-right'>
              <Button
                onClick={() => handleRemoveAccordionItem(item)}
                size='sm'
                variant='solid'
                color='danger'
                className='mb-4 mr-1 px-8'
              >
                Başvuruyu Kaldır
              </Button>
            </div>
            <form
              id={`form-${item}`}
              onSubmit={() => handleSubmit(item)}
              className='p-1'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <Dropdown
                    name='submission_period'
                    placeholder='Başvuru Dönemi Seçiniz'
                    required
                    options={next12Months}
                    optionLabel='value'
                    optionValue='value'
                    value={applicationList?.at(item - 1)?.submission_period}
                    onChange={(e) => handleDropdownChange(e, item)}
                  />
                  <InputText
                    size='sm'
                    name='name'
                    type='text'
                    required
                    defaultValue={user?.firstname ?? ''}
                    value={applicationList?.at(item - 1)?.name}
                    disabled
                    readOnly
                    onChange={(e) => handleInputChange(e, item)}
                  />
                  <InputText
                    size='sm'
                    name='surname'
                    type='text'
                    required
                    defaultValue={user?.lastname ?? ''}
                    value={applicationList?.at(item - 1)?.surname}
                    disabled
                    readOnly
                    onChange={(e) => handleInputChange(e, item)}
                  />
                  <InputText
                    size='sm'
                    name='email'
                    type='email'
                    defaultValue={user?.email ?? ''}
                    value={applicationList?.at(item - 1)?.email}
                    disabled
                    readOnly
                    required
                    onChange={(e) => handleInputChange(e, item)}
                  />

                  <Dropdown
                    name='title'
                    placeholder='Ünvan Seçiniz'
                    required
                    options={academicTitles}
                    optionLabel='value'
                    optionValue='value'
                    value={applicationList?.at(item - 1)?.title}
                    onChange={(e) => handleDropdownChange(e, item)}
                  />
                  <Dropdown
                    placeholder='Fakülte Seçiniz'
                    name='faculty'
                    value={applicationList?.at(item - 1)?.faculty}
                    onChange={(e) => handleFacultyChange(e.target.value, item)}
                    required
                    options={FacultiesAndDepartments}
                    optionLabel='faculty'
                    optionValue='faculty'
                  />

                  <Dropdown
                    placeholder='Departman Seçiniz'
                    name='department'
                    required
                    disabled={!applicationList?.at(item - 1)?.faculty}
                    optionLabel='value'
                    optionValue='value'
                    options={departments}
                    value={applicationList?.at(item - 1)?.department}
                    onChange={(e) => handleDropdownChange(e, item)}
                  ></Dropdown>
                </div>

                <div className='grid grid-cols-1 gap-4 relative'>
                  <InputText
                    size='sm'
                    name='work_name'
                    placeholder='Eser Adı Giriniz'
                    type='text'
                    required
                    value={applicationList?.at(item - 1)?.work_name}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                  <InputText
                    size='sm'
                    name='basic_field'
                    placeholder='Temel Alan Giriniz'
                    type='text'
                    required
                    value={applicationList?.at(item - 1)?.basic_field}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                  <InputText
                    size='sm'
                    name='scientific_field'
                    placeholder='Bilimsel Alan Giriniz'
                    type='text'
                    required
                    value={applicationList?.at(item - 1)?.scientific_field}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                  <Dropdown
                    name='persons'
                    placeholder='Kişi Sayısı Seçiniz'
                    required
                    options={[...Array(10)].fill(0).map((_, i) => i + 1)}
                    value={applicationList?.at(item - 1)?.persons}
                    onChange={(e) => handleDropdownChange(e, item)}
                  />

                  <Dropdown
                    name='academic_activity_type'
                    placeholder='Akademik Faaliyet Türü Seçiniz'
                    required
                    value={
                      applicationList?.at(item - 1)?.academic_activity_type
                    }
                    options={academicActivityTypes?.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    onChange={(e) =>
                      handleAcademicActivityTypeChange(e.target.value, item)
                    }
                  />

                  <Dropdown
                    name='activity'
                    placeholder='Faaliyet ID Seçiniz'
                    required
                    disabled={
                      !applicationList?.at(item - 1)?.academic_activity_type
                    }
                    value={applicationList?.at(item - 1)?.activity}
                    options={filteredActivities?.map((activity) => ({
                      label: activity.id + ' - ' + activity.description,
                      value: activity.id + ' - ' + activity.description,
                    }))}
                    onChange={(e) => handleDropdownChange(e, item)}
                  />

                  <InputText
                    size='sm'
                    name='doi_number'
                    placeholder='DOI | WOSS Numarası'
                    type='text'
                    required
                    value={applicationList?.at(item - 1)?.doi_number}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                </div>
              </div>
              {/* <FileUpload /> */}
              <input
                className='w-full my-4 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                onChange={(e) => handleFileChange(e, item)}
                name='file'
                type='file'
                placeholder='Dosya Yükleyiniz'
                required
                accept='application/pdf'
              />

              {/* <div className='text-center'>
                <Button
                  size='lg'
                  variant='solid'
                  color='primary'
                  className='my-6 font-bold  px-16'
                  type='submit'
                >
                  Başvuru Tamamla
                </Button>
              </div> */}
            </form>
          </AccordionTab>
        ))}
      </Accordion>
      <Button
        onClick={handleSubmitAll}
        size='lg'
        variant='solid'
        color='primary'
        className='my-6 font-bold px-16'
      >
        Tüm Başvuruları Gönder
      </Button>
    </Card>
  );
};

export default ApplicationForm;
