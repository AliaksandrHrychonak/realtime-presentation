'use client';

import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@shared/ui';

import type { ComponentPropsWithoutRef, JSX } from 'react';

interface INavigationItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    disabled?: boolean;
    isActive?: boolean;
}

export const NavigationMain = ({ items }: { items: INavigationItem[] }): JSX.Element => {
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupContent className='flex flex-col gap-2'>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                disabled={item.disabled ?? false}
                                isActive={pathname === item.url}
                            >
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export const NavigationSecondary = ({
    items,
    ...props
}: {
    items: INavigationItem[];
} & ComponentPropsWithoutRef<typeof SidebarGroup>): JSX.Element => {
    const pathname = usePathname();
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item: INavigationItem) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                disabled={item.disabled ?? false}
                                isActive={pathname === item.url}
                            >
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
