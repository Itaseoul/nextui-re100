import React, { useEffect, useState } from 'react';
import { Navbar, Link, Text, Spinner } from '@nextui-org/react';
import { LogoIcon } from '../icons/logo-icon';
import { Toggle } from './toggle';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FaFan, FaGlobe, FaRunning, FaSpinner } from 'react-icons/fa';
import { BsGlobe2, BsPower, BsWind } from 'react-icons/bs';
import { MdElectricBolt, MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { BiRun } from 'react-icons/bi';

export const NavbarWrapper = () => {
   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
   const [activeMenu, setActiveMenu] = useState();
   const router = useRouter();
   const collapseItems = ['About', 'run', 'Projects', 'Blog'];
   const collapseItems_KO = ['리백런이란?', '시작하기', '업사이클', '설명서'];

   useEffect(() => {
      // @ts-ignore
      document.body.style.overflow = null;
      isSideMenuOpen && (document.body.style.overflow = 'hidden');
   }, [isSideMenuOpen]);

   const HandleSideMenu = (flag = false, index = undefined) => {
      setActiveMenu(index);
      flag && setIsSideMenuOpen(!isSideMenuOpen);
      isSideMenuOpen && setIsSideMenuOpen(false);
   };
   return (
      <Navbar
         shouldHideOnScroll
         variant="static"
         maxWidth={'md'}
         css={{
            'bg': 'none',

            '& .nextui-navbar-container': {
               'mt': '$0',
               'bg': 'transparent',
               // 'mx': '$6',
               '--nextui--navbarContainerMaxWidth': '1200px',
            },
            '@xsMax': {
               '& .nextui-navbar-container': {

                  mx: '$0',
                  borderTopRightRadius: '0',
                  borderTopLeftRadius: '0',
                  ...(isSideMenuOpen && {
                     borderBottomRightRadius: '0',
                     borderBottomLeftRadius: '0',
                  }),
               },
            },
         }}
      >
         <Navbar.Toggle
            css={{ ml: "$8" }}
            showIn="xs"
            isSelected={isSideMenuOpen}
            onChange={() => HandleSideMenu(true, activeMenu)}
         />
         <NextLink href="/">
            <Navbar.Brand
               css={{

                  'cursor': 'pointer',
                  'transition': 'all 0.1s ease-in-out',
                  '&:hover': {
                     'color': '$accents8',
                     '& svg': {
                        transform: 'rotate(20deg)',
                     },
                  },
               }}
            >
               <MdElectricBolt color="green" />
               <Text b color="success" css={{ ml: "$3" }}>
                  RE100Run
               </Text>
            </Navbar.Brand>
         </NextLink>

         <Navbar.Content
            // css={{ '@sm': { w: '50%' }, 'ml': '$8' }}
            enableCursorHighlight
            activeColor="success"

            hideIn="xs"
            variant="highlight-rounded"
         >
            <NextLink href="/">
               <Navbar.Link isActive={router.pathname === '/'}>
                  {collapseItems_KO[0]}
               </Navbar.Link>
            </NextLink>

            <NextLink href="/run">
               <Navbar.Link href="#" isActive={router.pathname === '/run'}>
                  {collapseItems_KO[1]}
               </Navbar.Link>
            </NextLink>

            <NextLink href="/projects">
               <Navbar.Link
                  href="#"
                  isActive={router.pathname.includes('/projects')}
               >
                  {collapseItems_KO[2]}
               </Navbar.Link>
            </NextLink>

            <NextLink href="/blog">
               <Navbar.Link href="#" isActive={router.pathname === '/blog'}>
                  {collapseItems_KO[3]}
               </Navbar.Link>
            </NextLink>


         </Navbar.Content>

         {/* toggle dark-light */}
         <Navbar.Content
            css={{
               '@xs': {
                  w: '12%',
                  jc: 'flex-end',
               },
               'mr': '$8',
            }}
         >
            <Toggle />
         </Navbar.Content>

         <Navbar.Collapse

            isOpen={isSideMenuOpen}>
            {collapseItems.map((item, index) => (
               <Navbar.CollapseItem

                  key={item}
                  isActive={
                     (item === 'About' && router.pathname === '/') ||
                     (item === 'run' && router.pathname === '/run') ||
                     (item === 'Projects' && router.pathname === '/projects') ||
                     (item === 'Blog' && router.pathname === '/blog')
                  }
               >
                  <NextLink
                     href={(item === 'About' && '/') || item.toLowerCase()}
                  >
                     <Link
                        onClick={() => HandleSideMenu()}
                        color="inherit"
                        css={{
                           minWidth: '100%',

                        }}
                        href="#"
                     >
                        {collapseItems_KO[index]}
                     </Link>
                  </NextLink>
               </Navbar.CollapseItem>
            ))}
         </Navbar.Collapse>
      </Navbar>
   );
};
