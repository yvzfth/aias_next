// NavbarComponent.tsx
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { FacultiesAndDepartments } from '@/utils';
import { useRouter } from 'next/navigation';

interface Faculty {
  faculty: string;
  slug: string;
  // Diğer özellikler...
}

const NavbarComponent = () => {
  const router = useRouter();
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const handleItemClick = (item: Faculty) => {
    setSelectedFaculty(item.faculty);
    router.push(`/faculties/${item.slug}`);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='light' className='!text-base p-0 m-0 max-w-fit'>
            Fakülteler
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Dynamic Actions'
          items={FacultiesAndDepartments}
        >
          {(item: Faculty) => (
            <DropdownItem
              key={item.faculty}
              onClick={() => handleItemClick(item)}
            >
              {item.faculty}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {selectedFaculty && <h1>{selectedFaculty}</h1>}
    </div>
  );
};

export default NavbarComponent;
