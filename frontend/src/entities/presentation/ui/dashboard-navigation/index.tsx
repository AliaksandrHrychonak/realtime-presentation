'use client';
import { usePathname } from 'next/navigation';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@shared/ui';

import type { LucideIcon } from 'lucide-react';
import type { JSX } from 'react';

interface IDashboardNavigationItem {
    name: string;
    url: string;
    icon?: LucideIcon;
    disabled?: boolean;
    isActive?: boolean;
}

export const PresentationDashboardNavigation = ({ items }: { items: IDashboardNavigationItem[] }): JSX.Element => {
    const pathname = usePathname();

    return (
        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
            <SidebarGroupLabel>Presentations</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild disabled={item.disabled ?? false} isActive={pathname === item.url}>
                            <a href={item.url}>
                                {item.icon && <item.icon />}
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
