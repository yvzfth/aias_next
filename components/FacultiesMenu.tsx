import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { FacultiesAndDepartments } from '@/utils';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  return (
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
        {(item) => (
          <DropdownItem
            key={item.faculty}
            // color={item}
            onClick={() => router.push(`/faculties/${item.slug}`)}
          >
            {item.faculty}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
