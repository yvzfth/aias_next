import React, { FormEventHandler, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import NavbarComponent from '@/components/Navbar';

const HomePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    academic_activity_type: '',
    activity_id: '',
    description: '',
    point: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + '/activities',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Yeni Faaliyet
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Akademik Faaliyetler
              </ModalHeader>
              <ModalBody className='bg-transparent'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <Input
                      type='text'
                      label='Yeni Akademik Faaliyet Türü'
                      name='academic_activity_type'
                      value={formData.academic_activity_type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <Input
                      type='text'
                      label='Yeni Faaliyet Id'
                      name='activity_id'
                      value={formData.activity_id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <Input
                      type='textarea'
                      label='Yeni Faaaliyet Adı'
                      name='description'
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <Input
                      type='text'
                      label='Yeni Faaliyet Değeri'
                      name='point'
                      value={formData.point}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='solid'
                  color='primary'
                  onPress={(e) => {
                    handleSubmit(e).then(() => {
                      onClose();
                    });
                  }}
                >
                  Faaliyet Ekle
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
