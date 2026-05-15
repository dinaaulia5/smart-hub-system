import ThemeSwitcher from "@/Components/Dark/ThemeSwitcher";
import { Head, Link } from "@inertiajs/react";

export default function GuestLayout({ children, title }) {
    return (
        <>
            <Head title={title} />

            <div className="flex min-h-svh flex-col items-center justify-center bg-slate-100 p-6 dark:bg-background md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
                <div className="fixed flex justify-center w-full bottom-5 end-5 lg:justify-end">
                    <ThemeSwitcher />
                </div>
            </div>
        </>
    );
}
