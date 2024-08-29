'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const pathname = usePathname();

  const breadcrumbs: { path: string, label: string}[] = useMemo(() => {
    const breadcrumbs = [{
      path: '/',
      label: 'Home'
    }];

    if (pathname.includes('live-log')) {
      breadcrumbs.push({
        path: '/profile',
        label: 'Logs'
      }),
      breadcrumbs.push({
        path: pathname,
        label: pathname.split('/')[pathname.split('/').length - 1]
      });
    } else if (pathname.includes('tournament')) {
      breadcrumbs.push({
        path: '/profile',
        label: 'Tournaments'
      }),
      breadcrumbs.push({
        path: pathname,
        label: pathname.split('/')[pathname.split('/').length - 1]
      });
    }

    return breadcrumbs;
  }, [pathname]);

  return (
    <header className="sticky z-50 flex flex-col px-8 py-4 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map(({ path, label }, idx) => (
            <>
                <BreadcrumbItem>
                <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
              {(idx < breadcrumbs.length - 1) && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
    </header>
  );
}
