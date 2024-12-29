'use client';

import { useState } from "react";
import Llink from "./link";



export function EmailShower() {
    const [email, setEmail] = useState<string | null>(null);
    return <>
        <Llink onClick={() => setEmail('ozieblowski.kacper@gmail.com')} >Email</Llink>
        {email && <span className="fixed left-0 top-0 w-full text-center text-white bg-blue-600">{email}</span>}
    </>;
}