'use client';

import Link from 'next/link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Llink({ href, onClick, target, children }: Readonly<{ onClick?: () => void, href?: string, children: React.ReactNode, target?: string }>) {    
    if(href && onClick) throw new Error('Llink: cannot have both href and onClick');
    const inside = <>
        <ArrowOutwardIcon className='text-[var(--accent)] group-hover:text-[var(--foreground)]' />
            <span className='bg-black/5 dark:bg-white/5'>
                {children}
            </span>
    </>;
    return (
        href ?
        <Link
            href={href}
            onClick={onClick}
            target={target}
            className='hover:bg-[var(--accent)] group'
        >
            {inside}
        </Link>
        :
        <span
            onClick={onClick}
            className='hover:bg-[var(--accent)] group'
        >
            {inside}
        </span>
    );
}