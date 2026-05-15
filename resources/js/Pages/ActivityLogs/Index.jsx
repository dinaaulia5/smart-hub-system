import Banner from "@/Components/Banner";
import BreadcrumbHeader from "@/Components/BreadcrumbHeader";
import EmptyState from "@/Components/EmptyState";
import Filter from "@/Components/Datatable/Filter";
import PaginationTable from "@/Components/Datatable/PaginationTable";
import ShowFilter from "@/Components/Datatable/ShowFilter";
import HeaderTitle from "@/Components/HeaderTitle";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import UseFilter from "@/Hooks/UseFilter";
import AppLayout from "@/Layouts/AppLayout";
import { formatDateIndo } from "@/lib/utils";

import {
    IconArrowsDownUp,
    IconBrandChrome,
    IconBrandEdge,
    IconBrandFirefox,
    IconDeviceDesktop,
    IconLogs,
} from "@tabler/icons-react";

import { useState } from "react";

export default function Index(props) {
    const { data: activityLogs, meta, links } = props.activityLogs;

    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };

    UseFilter({
        route: route("activity-log.index"),
        values: params,
        only: ["activityLogs"],
    });

    const getBrowserIcon = (browser) => {
        if (!browser) return IconDeviceDesktop;

        const value = browser.toLowerCase();

        if (value.includes("chrome")) return IconBrandChrome;
        if (value.includes("firefox")) return IconBrandFirefox;
        if (value.includes("edge")) return IconBrandEdge;

        return IconDeviceDesktop;
    };

    return (
        <div className="flex flex-col w-full pb-32 gap-y-6">
            <BreadcrumbHeader items={props.items} />

            <Banner
                title={props.pageSettings.banner.title}
                subTitle={props.pageSettings.banner.subtitle}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card className="border-0 text-white bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <CardContent className="p-5">
                        <p className="text-sm text-white/80">
                            Total Activity Log
                        </p>

                        <h3 className="mt-2 text-4xl font-bold">
                            {props.count.countLog}
                        </h3>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="p-0">
                    <div className="flex flex-col items-start justify-between p-4 gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.pageSettings.title}
                            subTitle={props.pageSettings.subtitle}
                            icon={IconLogs}
                        />
                    </div>

                    <Filter params={params} setParams={setParams} />
                    <ShowFilter params={params} />
                </CardHeader>

                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {activityLogs.length === 0 ? (
                        <EmptyState
                            icon={IconLogs}
                            title="Belum ada activity log"
                            subtitle="Aktivitas pengguna akan muncul di sini"
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Aktivitas</TableHead>
                                    <TableHead>Browser</TableHead>
                                    <TableHead>OS</TableHead>
                                    <TableHead>IP Address</TableHead>

                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() =>
                                                onSortTable("created_at")
                                            }
                                        >
                                            Tanggal
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {activityLogs.map((log, index) => {
                                    const BrowserIcon = getBrowserIcon(
                                        log.browser,
                                    );

                                    return (
                                        <TableRow key={log.id}>
                                            <TableCell>
                                                {index +
                                                    1 +
                                                    (meta.current_page - 1) *
                                                        meta.per_page}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {log.user?.name ??
                                                            "System"}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {log.user?.email ?? "-"}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {log.description}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <BrowserIcon className="size-4" />
                                                    <span>
                                                        {log.browser ?? "-"}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {log.os ?? "-"}
                                            </TableCell>

                                            <TableCell>
                                                {log.ip_address ?? "-"}
                                            </TableCell>

                                            <TableCell>
                                                {log.created_at
                                                    ? formatDateIndo(
                                                          log.created_at,
                                                      )
                                                    : "-"}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col justify-between items-center w-full py-3 border-t gap-y-2 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-medium text-emerald-600">
                            {meta.from ?? 0}
                        </span>{" "}
                        dari {meta.total} Activity Log
                    </p>

                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <PaginationTable meta={meta} links={links} />
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => (
    <AppLayout title={page.props.pageSettings.title} children={page} />
);
