


export default function Block({ children, heading, nopad }: Readonly<{ heading?: string, children: React.ReactNode; nopad?: boolean }>) {

    return (
        <div className="rounded-lg flex-grow h-full w-full bg-[var(--background)] sm:shadow-2xl sm:border border-black/10 dark:border-white/10 dark:shadow-white/15">

            {
                !heading ? null :
                    <div className="rounded-t-lg pb-0 sm:pb-4 p-4 text-2xl">{
                        heading}
                    </div>
            }

            <div className={`p-${nopad ? 0 : 4} text-lg`}>
                {children}
            </div>

        </div>
    );
}