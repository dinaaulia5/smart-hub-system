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

import { IconArrowsDownUp, IconUsers } from "@tabler/icons-react";

import { useState } from "react";

export default function Index(props) {
    const { data: users, meta, links } = props.users;

    const [params, setParams] = useState(props.state);

    // SORT
    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };

    UseFilter({
        route: route("user.index"),
        values: params,
        only: ["user"],
    });

    return (
        <div className="flex flex-col w-full pb-32 gap-y-6">
            <BreadcrumbHeader items={props.items} />

            <Banner
                title={props.pageSettings.banner.title}
                subTitle={props.pageSettings.banner.subtitle}
            />

            {/* COUNT */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card className="border-0 text-white bg-gradient-to-br from-blue-500 to-cyan-400">
                    <CardContent className="p-5">
                        <p className="text-sm text-white/80">Total Pengguna</p>

                        <h3 className="mt-2 text-4xl font-bold">
                            {props.count.countUser}
                        </h3>
                    </CardContent>
                </Card>

                <Card className="border-0 text-white bg-gradient-to-br from-emerald-500 to-lime-400">
                    <CardContent className="p-5">
                        <p className="text-sm text-white/80">
                            Pengguna Hari Ini
                        </p>

                        <h3 className="mt-2 text-4xl font-bold">
                            {props.count.countUserToday}
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
                            icon={IconUsers}
                        />
                    </div>

                    <Filter params={params} setParams={setParams} />
                    <ShowFilter params={params} />
                </CardHeader>

                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {users.length === 0 ? (
                        <EmptyState
                            icon={IconUsers}
                            title="Tidak ada pengguna"
                            subtitle="Belum ada data pengguna"
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {/* NO */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("id")}
                                        >
                                            #
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* NAME */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("name")}
                                        >
                                            Nama
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* EMAIL */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("email")}
                                        >
                                            Email
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* CREATED */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() =>
                                                onSortTable("created_at")
                                            }
                                        >
                                            Tanggal Dibuat
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        {/* NO */}
                                        <TableCell>
                                            {index +
                                                1 +
                                                (meta.current_page - 1) *
                                                    meta.per_page}
                                        </TableCell>

                                        {/* NAME */}
                                        <TableCell>{user.name}</TableCell>

                                        {/* EMAIL */}
                                        <TableCell>{user.email}</TableCell>

                                        {/* CREATED */}
                                        <TableCell>
                                            {user.created_at
                                                ? formatDateIndo(
                                                      user.created_at,
                                                  )
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                        dari {meta.total} Pengguna
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
