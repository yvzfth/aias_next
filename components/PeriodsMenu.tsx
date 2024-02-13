import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { next12Months } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='light' className='!text-base p-0 m-0 max-w-fit'>
          Dönemler
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Dynamic Actions' items={next12Months}>
        {(item) => (
          <DropdownItem
            key={item.id}
            // color={item}
            onClick={() => router.push(`/periods/${item.id}`)}
          >
            {item.value}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
