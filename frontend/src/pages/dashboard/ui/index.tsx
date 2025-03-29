import { ViewerBar } from '@entities/session';
import { Separator, Sidebar, SidebarFooter, SidebarInset, SidebarProvider, SidebarTrigger } from '@shared/ui';

import type { JSX, ReactNode } from 'react';

export const DashboardLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <SidebarProvider>
            <Sidebar variant='inset'>
                {/*<SidebarHeader></SidebarHeader>*/}
                {/*<SidebarContent></SidebarContent>*/}
                <SidebarFooter>
                    <ViewerBar
                        viewer={{
                            username: 'wq',
                            id: '123-456-68686',
                        }}
                    />
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
                {/*<div className='flex flex-1 flex-col'>*/}
                {/*    <div className='@container/main flex flex-1 flex-col gap-2'>*/}
                {/*        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>*/}
                {/*            <div className='px-4 lg:px-6'>*/}
                {/*                <PresentationList />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </SidebarInset>
        </SidebarProvider>
    );
};

export const DashboardPage = (): JSX.Element => {
    return <div>dashboard</div>;
};
