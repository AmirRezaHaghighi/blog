import Link from 'next/link';
import type { ElementType } from 'react';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
  icon?: ElementType;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={item.name + index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray select-none">
                  <ChevronLeft size={20} /> 
                </span>
              )}
              
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 text-sm text-txt-secondary"
                >
                  {Icon && <Icon className="text-primary" size={20} />}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-sm text-txt-secondary">
                  {Icon && <Icon className="text-primary" size={20} />}
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
