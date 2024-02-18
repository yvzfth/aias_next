import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/utils/index';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import PeriodsMenu from './PeriodsMenu';
import FacultiesMenu from './FacultiesMenu';

export default function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  // const currentPath = pathname.split('/').pop() || 'index';

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')!);
    setUser(userData);
  }, []);

  return (
    <Navbar
      position='static'
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
      className='overflow-visible'
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <Link href='/'>
          <NavbarBrand className=' flex gap-4'>
            <Image
              width={50}
              height={50}
              alt='logo'
              src={'/logo-kucuk.png'}
              className='w-auto h-auto'
            />
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarBrand className='hidden sm:flex'>
        <Link href='/' className='flex gap-4 items-center'>
          <Image
            width={100}
            height={66}
            alt='logo'
            src={'/logo-kucuk.png'}
            className='w-auto h-auto'
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {Object.keys(NAV_ITEMS).map((key, index) => (
          <NavbarItem key={index} isActive={currentPath.includes(key)}>
            <Link
              color={currentPath.includes(key) ? 'primary' : 'foreground'}
              href={`/${key}`}
            >
              {NAV_ITEMS[key]}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem key={'periods'} isActive={currentPath.includes('periods')}>
          <PeriodsMenu />
        </NavbarItem>
        <NavbarItem
          key={'faculties'}
          isActive={currentPath.includes('faculties')}
        >
          <FacultiesMenu />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Link href='/apply'>
            <Button
              size='sm'
              className='sm:hidden !max-w-fit !p-0 !m-0 min-w-8 rounded-full'
              variant='ghost'
              color='primary'
            >
              <FaPlus />
            </Button>
            <Button
              className='hidden sm:flex'
              variant='ghost'
              color='primary'
              startContent={<FaPlus />}
            >
              Başvuru
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem className='sm:hidden'>
          <Dropdown placement='bottom-start'>
            <DropdownTrigger>
              <Avatar
                as='button'
                color='primary'
                size='sm'
                alt='avatar'
                className='!w-[2rem] !h-[2rem]'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='User Actions' variant='flat'>
              <DropdownItem
                key='profile'
                onClick={() => router.push('/profile')}
              >
                Profil
              </DropdownItem>
              <DropdownItem
                key='activity_settings'
                onClick={() => router.push('/activity_settings')}
              >
                Faaliyet Ayarları
              </DropdownItem>
              <DropdownItem
                key='CoefficientPage'
                onClick={() => router.push('/CoefficientPage')}
              >
                Katsayı Ayarları
              </DropdownItem>

              <DropdownItem
                key='logout'
                color='danger'
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  return router.push('/signin');
                }}
              >
                Çıkış Yap
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className='hidden sm:flex'>
          <Dropdown placement='bottom-start'>
            <DropdownTrigger>
              <Button variant='bordered' className='transition-transform h-fit'>
                {user && (
                  <div className='flex flex-col items-center justify-center '>
                    <span className='font-semibold'>
                      {user.firstname + ' ' + user.lastname}
                    </span>
                    <span className='text-xs text-gray-700'>{user.email}</span>
                  </div>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='User Actions' variant='flat'>
              <DropdownItem
                key='profile'
                onClick={() => router.push('/profile')}
              >
                Profil
              </DropdownItem>
              <DropdownItem
                key='activity_settings'
                onClick={() => router.push('/activity_settings')}
              >
                Faaliyet Ayarları
              </DropdownItem>
              <DropdownItem
                key='CoefficientPage'
                onClick={() => router.push('/CoefficientPage')}
              >
                Katsayı Ayarları
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  return router.push('/signin');
                }}
              >
                Çıkış Yap
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {Object.keys(NAV_ITEMS).map((key, index) => (
          <NavbarMenuItem key={index} isActive={currentPath.includes(key)}>
            <Link
              color={currentPath.includes(key) ? 'primary' : 'foreground'}
              href={`/${key}`}
            >
              <div className='text-lg'>{NAV_ITEMS[key]}</div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
