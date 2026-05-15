import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import AppLayout from "@/Layouts/AppLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const auth = usePage().props.auth.user;

    return (
        <div className="flex flex-col w-full pb-32 gap-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={route("dashboard")}>
                            My Money+
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    <BreadcrumbList>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbList>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-row items-center justify-between gap-2 p-6 text-white rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100">
                <div className="flex-flex-col">
                    <h2 className="text-2xl font-medium leading-relaxed">
                        Hi, {auth.name}
                    </h2>
                    <p className="text-sm">
                        Selamat Datang{" "}
                        <span className="font-bold">My Money</span>, atur
                        keuangan anda dengan baik demi masa depan yang cerah
                    </p>
                </div>
                <Avatar>
                    <AvatarImage src={auth.avatar}></AvatarImage>
                    <AvatarFallback>{auth.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title="Dashborad" children={page} />;
