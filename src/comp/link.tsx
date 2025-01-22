'use client';

import Link from 'next/link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useMemo } from 'react';


function Inner({ children, disabled }: Readonly<{ children: React.ReactNode, disabled?: boolean }>) {
    return (
        <>
            <ArrowOutwardIcon className={`text-[var(${disabled ? '--foreground' : '--accent'})] group-hover:text-[var(--foreground)]`} />
            <span className='bg-black/5 dark:bg-white/5'>
                {children}
            </span>
        </>
    );
}

export default function Llink({ href, onClick, target, children, disabled }: Readonly<{ onClick?: () => void, href?: string, children: React.ReactNode, target?: string, disabled?: boolean }>) {
    if (href && onClick) throw new Error('Llink: cannot have both href and onClick');
    return (
        href ?
            <Link
                href={href}
                onClick={onClick}
                target={target}
                className={`group ${disabled ? 'opacity-60' : 'hover:bg-[var(--accent)]'}`}
            >
                <Inner disabled={disabled}>
                    {children}
                </Inner>
            </Link>
            :
            <span
                onClick={onClick}
                className={`group ${disabled ? 'opacity-60' : 'hover:bg-[var(--accent)]'}`}
            >
                <Inner disabled={disabled}>
                    {children}
                </Inner>
            </span>
    );
}