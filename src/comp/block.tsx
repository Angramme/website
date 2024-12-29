


export default function Block({ children, heading, nopad }: Readonly<{ heading?: string, children: React.ReactNode; nopad?: boolean }>) {

    return (
        <div className="rounded-lg flex-grow h-full w-full bg-[var(--background)] shadow-2xl border border-black/20 dark:border-white/20 dark:shadow-white/10">

            {
                !heading ? null :
                    <div className="rounded-t-lg p-4 text-2xl">{
                        heading}
                    </div>
            }

            <div className={`p-${nopad ? 0 : 4} text-lg`}>
                {children}
            </div>

        </div>
    );
}