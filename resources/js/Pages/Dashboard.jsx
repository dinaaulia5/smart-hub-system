import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import {
    IconBox,
    IconCalendarEvent,
    IconDoor,
    IconUsers,
} from "@tabler/icons-react";

export default function Dashboard() {
    const { auth, count, activityLogs, bookingSummary } = usePage().props;

    const cards = [
        {
            title: "Total User",
            value: count.countUser,
            icon: IconUsers,
            color: "from-blue-500 to-cyan-400",
            iconBg: "bg-white/20",
        },
        {
            title: "Total Ruangan",
            value: count.countRoom,
            icon: IconDoor,
            color: "from-emerald-500 to-lime-400",
            iconBg: "bg-white/20",
        },
        {
            title: "Total Inventaris",
            value: count.countEquipment,
            icon: IconBox,
            color: "from-orange-500 to-yellow-400",
            iconBg: "bg-white/20",
        },
        {
            title: "Total Booking",
            value: count.countBooking,
            icon: IconCalendarEvent,
            color: "from-violet-500 to-fuchsia-400",
            iconBg: "bg-white/20",
        },
    ];

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={route("dashboard")}>
                            Smart Hub
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-row items-center justify-between gap-2 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100 p-6 text-white">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-medium leading-relaxed">
                        Hi, {auth.user.name}
                    </h2>
                    <p className="text-sm">
                        Selamat datang di{" "}
                        <span className="font-bold">
                            Smart Hub Management System
                        </span>
                    </p>
                </div>

                <Avatar>
                    <AvatarImage src={auth.user.avatar} />
                    <AvatarFallback>
                        {auth.user.name.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <Card
                            key={index}
                            className={`border-0 text-white bg-gradient-to-br ${card.color}`}
                        >
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <p className="text-sm text-white/80">
                                        {card.title}
                                    </p>

                                    <h3 className="mt-2 text-4xl font-bold">
                                        {card.value ?? 0}
                                    </h3>
                                </div>

                                <div
                                    className={`rounded-2xl p-4 ${card.iconBg}`}
                                >
                                    <Icon className="size-8" />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* ACTIVITY LOG */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Log Terbaru</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {activityLogs?.length > 0 ? (
                            activityLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="rounded-xl border p-4"
                                >
                                    <p className="font-medium">
                                        {log.description}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {log.user?.name ?? "System"} •{" "}
                                        {log.browser ?? "-"} • {log.os ?? "-"}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        IP: {log.ip_address ?? "-"}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada activity log.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* CHECK IN */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Sudah Check-in</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {bookingSummary.checkedIn?.length > 0 ? (
                            bookingSummary.checkedIn.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="rounded-xl border p-4"
                                >
                                    <p className="font-medium">
                                        {booking.user?.name ?? "-"}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Status: {booking.status}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Check-in: {booking.check_in_at ?? "-"}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada user yang check-in.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title="Dashboard" children={page} />;
