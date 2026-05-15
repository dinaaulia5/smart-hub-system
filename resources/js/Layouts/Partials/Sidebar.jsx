import ApplicationLogo from "@/Components/ApplicationLogo";
import { Card, CardContent } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import NavLink from "@/Components/NavLink";

import {
    IconActivityHeartbeat,
    IconBox,
    IconCalendarEvent,
    IconLayoutDashboard,
    IconTool,
    IconUsers,
    IconLogout2,
} from "@tabler/icons-react";

const Sidebar = ({ auth, url }) => {
    return (
        <nav className="flex flex-col flex-1 gap-y-6 overflow-y-auto scrollbar-none">
            <ApplicationLogo url="url" />

            <Card>
                <CardContent className="flex items-center gap-x-3 p-3">
                    <Avatar>
                        <AvatarImage src={auth.avatar}></AvatarImage>

                        <AvatarFallback>
                            {auth.name.substring(0, 1)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="line-clamp-1 text-sm font-medium leading-relaxed tracking-tighter">
                            {auth.name}
                        </span>

                        <span className="line-clamp-1 text-xs font-light">
                            {auth.id}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <ul role="list" className="flex flex-col flex-1 gap-y-2">
                {/* GENERAL */}
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    General
                </div>

                <NavLink
                    title="Dashboard"
                    url={route("dashboard")}
                    active={url.startsWith("/dashboard")}
                    icon={IconLayoutDashboard}
                />

                {/* MASTER */}
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Master
                </div>

                <NavLink
                    title="Pengguna"
                    url={route("user.index")}
                    active={url.startsWith("/user")}
                    icon={IconUsers}
                />

                <NavLink
                    title="Log Aktivitas"
                    url={route("activity-log.index")}
                    active={url.startsWith("/activity-log")}
                    icon={IconActivityHeartbeat}
                />

                <NavLink
                    title="Data Peralatan Studio"
                    url={route("equipment.index")}
                    active={url.startsWith("/equipment")}
                    icon={IconTool}
                />

                <NavLink
                    title="Data Ruangan"
                    url={route("room.index")}
                    active={url.startsWith("/room")}
                    icon={IconBox}
                />

                {/* COMPONENTS */}
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Components
                </div>

                <NavLink
                    title="Data Peminjaman"
                    url={route("booking.index")}
                    active={url.startsWith("/booking")}
                    icon={IconCalendarEvent}
                />

                {/* LAINNYA */}
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Lainnya
                </div>
                <NavLink
                    as="button"
                    method="post"
                    title="Logout"
                    url={route("logout")}
                    active={url.startsWith("/logout")}
                    icon={IconLogout2}
                    className="w-full"
                />
            </ul>
        </nav>
    );
};

export default Sidebar;
