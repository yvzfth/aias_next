import { FacultiesAndDepartments } from '@/utils';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdAssignmentAdd } from 'react-icons/md';
import { Accordion, AccordionItem } from '@nextui-org/react';
const ApplicationForm = () => {
  const [file, setFile] = useState(null);
  const [accordionItems, setAccordionItems] = useState([1]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [departments, setDepartments] = useState([] as string[]);
  const [activities, setActivities] = useState<any[]>([]);
  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };
  const handleAddAccordionItem = () => {
    const newAccordionItems = [...accordionItems, accordionItems.length + 1];
    setAccordionItems(newAccordionItems);
  };
  const handleRemoveAccordionItem = (index: any) => {
    const newAccordionItems = accordionItems.filter((item) => item !== index);
    setAccordionItems(newAccordionItems);
  };

  const handleFacultyChange = (value: string) => {
    console.log(value);
    setSelectedFaculty(value);
    setDepartments(FacultiesAndDepartments[value]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append('file', file!);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + '/submissions',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming Laravel returns the saved submission data in the response
      const responseData = await response.json();
      console.log(responseData);

      // Reset the form after successful submission if needed
      event.currentTarget.reset();

      // Handle any additional logic after successful submission
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  const date = new Date();
  const currentMonth = date.getMonth();
  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  let next12Months: any[] = [];
  for (let i = 0; i < 12; i++) {
    next12Months.push(monthNames[(currentMonth + i) % 12]);
  }
  const [academicActivityTypes, setAcademicActivityTypes] = useState<string[]>(
    []
  );
  const [filteredActivities, setFilteredActivities] = useState<
    { id: string; description: string }[]
  >([]);
  const [selectedActivityType, setSelectedActivityType] = useState<
    string | null
  >(null);

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
  const handleAcademicActivityTypeChange = (selectedType: string) => {
    setSelectedActivityType(selectedType);
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
        className='mx-auto p-4'
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
      <Accordion defaultExpandedKeys={['1']} variant='splitted'>
        {accordionItems.map((item) => (
          <AccordionItem key={item} title={`Başvuru Formu ${item}`}>
            <div className='w-full items-end text-right'>
              <Button
                onClick={() => handleRemoveAccordionItem(item)}
                size='sm'
                variant='solid'
                color='danger'
                className='mb-4  px-8'
              >
                Başvuruyu Kaldır
              </Button>
            </div>
            <form onSubmit={handleSubmit} className='p-1'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <Select
                    size='sm'
                    variant='faded'
                    name='submission_period'
                    placeholder='Başvuru Dönemi Seçiniz'
                    label='Başvuru Dönemi'
                    isRequired
                    // className='w-[11.28rem] -mt-[4.5rem] absolute'
                  >
                    {next12Months.map((month, index) => (
                      <SelectItem value={month} key={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    size='sm'
                    variant='faded'
                    name='name'
                    label='İsim'
                    type='text'
                    isRequired
                    defaultValue={
                      JSON.parse(localStorage.getItem('user') as any)
                        ?.firstname ?? ''
                    }
                    value={
                      JSON.parse(localStorage.getItem('user') as any)
                        ?.firstname ?? ''
                    }
                    // disabled
                    isReadOnly
                  />
                  <Input
                    size='sm'
                    variant='faded'
                    name='surname'
                    label='Soyisim'
                    type='text'
                    isRequired
                    defaultValue={
                      JSON.parse(localStorage.getItem('user') as any)
                        ?.lastname ?? ''
                    }
                    value={
                      JSON.parse(localStorage.getItem('user') as any)
                        ?.lastname ?? ''
                    }
                    // disabled
                    isReadOnly
                  />
                  <Input
                    size='sm'
                    variant='faded'
                    name='email'
                    label='Email'
                    type='email'
                    defaultValue={
                      JSON.parse(localStorage.getItem('user') as any)?.email ??
                      ''
                    }
                    value={
                      JSON.parse(localStorage.getItem('user') as any)?.email ??
                      ''
                    }
                    // disabled
                    isRequired
                    isReadOnly
                  />

                  <Select
                    size='sm'
                    variant='faded'
                    name='title'
                    label='Ünvan'
                    placeholder='Ünvan Seçiniz'
                    isRequired
                  >
                    <SelectItem key='prof' value='Prof. Dr.'>
                      Prof. Dr.
                    </SelectItem>
                    <SelectItem key='doç' value='Doç. Dr.'>
                      Doç. Dr.
                    </SelectItem>
                    <SelectItem key='dr öğr' value='Dr. Öğr. Üyesi.'>
                      Dr. Öğr. Üyesi.
                    </SelectItem>
                    <SelectItem key='öğr' value='Öğr. Gör.'>
                      Öğr. Gör.
                    </SelectItem>
                    <SelectItem key='arş' value='Arş. Gör.'>
                      Arş. Gör.
                    </SelectItem>
                    <SelectItem key='uzm' value='Uzman. Gör.'>
                      Uzman. Gör.
                    </SelectItem>
                  </Select>
                  <Select
                    size='sm'
                    variant='faded'
                    label='Fakülte'
                    placeholder='Fakülte Seçiniz'
                    name='faculty'
                    value={selectedFaculty}
                    onChange={(e) => handleFacultyChange(e.target.value)}
                    isRequired
                  >
                    {Object.keys(FacultiesAndDepartments).map(
                      (faculty, index) => (
                        <SelectItem value={faculty} key={faculty}>
                          {faculty}
                        </SelectItem>
                      )
                    )}
                  </Select>
                  <Select
                    size='sm'
                    variant='faded'
                    label='Departman'
                    placeholder='Departman Seçiniz'
                    name='department'
                    isRequired
                    isDisabled={!selectedFaculty}
                  >
                    {departments?.map((department, index) => (
                      <SelectItem value={department} key={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className='grid grid-cols-1 gap-4 relative'>
                  <Input
                    size='sm'
                    variant='faded'
                    label='Eser Adı'
                    name='work_name'
                    placeholder='Eser Adı Giriniz'
                    type='text'
                    isRequired
                  />
                  <div className='flex gap-2'>
                    <Input
                      size='sm'
                      variant='faded'
                      label='Temel Alan'
                      name='basic_field'
                      placeholder='Temel Alan Giriniz'
                      type='text'
                      isRequired
                    />
                    <Input
                      size='sm'
                      variant='faded'
                      label='Bilimsel Alan'
                      name='scientific_field'
                      placeholder='Bilimsel Alan Giriniz'
                      type='text'
                      isRequired
                    />
                  </div>
                  <Select
                    size='sm'
                    variant='faded'
                    name='persons'
                    label='Kişi Sayısı'
                    placeholder='Kişi Sayısı Seçiniz'
                    isRequired
                  >
                    {[...Array(10)].map((_, index) => {
                      return (
                        <SelectItem
                          key={String(index + 1)}
                          value={String(index + 1)}
                        >
                          {String(index + 1)}
                        </SelectItem>
                      );
                    })}
                  </Select>
                  <Select
                    size='sm'
                    variant='faded'
                    label='Faaliyet Türü'
                    name='academic_activity_type'
                    placeholder='Akademik Faaliyet Türü Seçiniz'
                    isRequired
                    onChange={(e) =>
                      handleAcademicActivityTypeChange(e.target.value)
                    }
                  >
                    {academicActivityTypes?.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size='sm'
                    variant='faded'
                    label='Faaliyet'
                    name='activity'
                    placeholder='Faaliyet ID Seçiniz'
                    isRequired
                    isDisabled={!selectedActivityType}
                  >
                    {filteredActivities.map((activity) => (
                      <SelectItem
                        key={activity.id + ' - ' + activity.description}
                        value={activity.id + ' - ' + activity.description}
                      >
                        {`${activity.id} - ${activity.description}`}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    size='sm'
                    variant='faded'
                    label='DOI | WOSS'
                    name='doi_number'
                    placeholder='DOI | WOSS Numarası'
                    type='text'
                    isRequired
                  />

                  <Input
                    onChange={handleFileChange}
                    size='sm'
                    variant='faded'
                    name='file_path'
                    type='file'
                    placeholder='Dosya Yükleyiniz'
                    isRequired
                    accept='application/pdf'
                  />
                </div>
              </div>
              <div className='text-center'>
                <Button
                  size='lg'
                  variant='solid'
                  color='primary'
                  className='my-6 font-bold  px-16'
                  type='submit'
                >
                  Başvuru Tamamla
                </Button>
              </div>
            </form>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default ApplicationForm;
