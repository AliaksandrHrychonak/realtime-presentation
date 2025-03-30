'use client';

import {
    BarChartIcon,
    FolderIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    PresentationIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
    WrenchIcon,
} from 'lucide-react';

import { NavigationSecondary, NavigationMain } from '@entities/navigation';
import { PresentationDashboardNavigation } from '@entities/presentation';
import { ViewerBar } from '@entities/session';
import {
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@shared/ui';

import type { JSX, ReactNode } from 'react';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboardIcon,
        },
        {
            title: 'Analytics',
            url: '#',
            icon: BarChartIcon,
            disabled: true,
        },
        {
            title: 'Projects',
            url: '#',
            icon: FolderIcon,
            disabled: true,
        },
        {
            title: 'Team',
            url: '#',
            icon: UsersIcon,
            disabled: true,
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: SettingsIcon,
            disabled: true,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: HelpCircleIcon,
            disabled: true,
        },
        {
            title: 'Search',
            url: '#',
            icon: SearchIcon,
            disabled: true,
        },
    ],
    presentations: [
        {
            name: 'List',
            url: '/dashboard/presentation/list',
            icon: PresentationIcon,
        },
    ],
};

export const DashboardLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <SidebarProvider>
            <Sidebar variant='inset'>
                <SidebarHeader>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-accent-foreground rounded-lg flex items-center justify-center p-0.5'>
                            <span className='text-white font-bold text-xl'>RP</span>
                        </div>
                        <span className='font-semibold text-l'>RealTime Presentation</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <NavigationMain items={data.navMain} />
                    <PresentationDashboardNavigation items={data.presentations} />
                    <NavigationSecondary items={data.navSecondary} />
                </SidebarContent>
                <SidebarFooter>
                    <ViewerBar />
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
                    <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export const DashboardPage = (): JSX.Element => {
    return (
        <div className='m-auto'>
            <WrenchIcon className='h-12 w-12' />
        </div>
    );
};
