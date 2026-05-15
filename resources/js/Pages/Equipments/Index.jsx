import AlertAction from "@/Components/AlertAction";
import Banner from "@/Components/Banner";
import BreadcrumbHeader from "@/Components/BreadcrumbHeader";
import CardStat from "@/Components/CardStat";
import Filter from "@/Components/Datatable/Filter";
import PaginationTable from "@/Components/Datatable/PaginationTable";
import ShowFilter from "@/Components/Datatable/ShowFilter";
import EmptyState from "@/Components/EmptyState";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
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
import { deleteAction, formatDateIndo, formatToRupiah } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import {
    IconArrowsDownUp,
    IconCash,
    IconCheck,
    IconMoneybag,
    IconPencil,
    IconPlus,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Index(props) {
    const { data: equipments, meta, links } = props.equipments; // ini adalah OBJEK

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
        route: route("equipment.index"),
        values: params,
        only: ["equipment"],
    });
    return (
        <div className="flex flex-col w-full pb-32 gap-y-6">
            <BreadcrumbHeader items={props.items} />
            <Banner
                title={props.pageSettings.banner.title}
                subTitle={props.pageSettings.banner.subtitle}
            />

            <Card>
                <CardHeader className="p-0">
                    <div className="flex flex-col items-start justify-between p-4 gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.pageSettings.title}
                            subTitle={props.pageSettings.subtitle}
                            icon={IconMoneybag}
                        />
                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route("equipment.create")}>
                                <IconPlus className="size-4" />
                                Tambah
                            </Link>
                        </Button>
                    </div>

                    <Filter params={params} setParams={setParams} />
                    <ShowFilter params={params} />
                </CardHeader>

                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {equipments.length === 0 ? (
                        <EmptyState
                            icon={IconMoneybag}
                            title="Tidak ada Tujuan"
                            subtitle="Mulailah dengan membuat tujuan baru"
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {/* NOMOR */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("id")}
                                        >
                                            #
                                            <span className="flex-none ml-2 rounded text-muted-foregroud">
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
                                            Nama Peralatan
                                            <span className="flex-none ml-2 rounded text-muted-foregroud">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* BRAND */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("name")}
                                        >
                                            Brand Peralatan
                                            <span className="flex-none ml-2 rounded text-muted-foregroud">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* BRAND */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("name")}
                                        >
                                            Stok
                                            <span className="flex-none ml-2 rounded text-muted-foregroud">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* BRAND */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortTable("name")}
                                        >
                                            Status
                                            <span className="flex-none ml-2 rounded text-muted-foregroud">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    {/* AKSI */}
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {equipments.map((equipment, index) => (
                                    <TableRow key={index}>
                                        {/* NOMOR */}
                                        <TableCell>
                                            {index +
                                                1 +
                                                (meta.current_page - 1) *
                                                    meta.per_page}
                                        </TableCell>

                                        {/* NAME */}
                                        <TableCell>{equipment.name}</TableCell>

                                        {/* BRAND */}
                                        <TableCell>{equipment.brand}</TableCell>

                                        {/* STOCK */}
                                        <TableCell>{equipment.stock}</TableCell>

                                        {/* STATUS */}
                                        <TableCell>
                                            {equipment.status}
                                        </TableCell>

                                        {/* AKSI */}
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button
                                                    variant="blue"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "equipment.edit",
                                                            [equipment],
                                                        )}
                                                    >
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>

                                                <AlertAction
                                                    trigger={
                                                        <Button
                                                            variant="red"
                                                            size="sm"
                                                        >
                                                            <IconTrash />
                                                        </Button>
                                                    }
                                                    action={() =>
                                                        deleteAction(
                                                            route(
                                                                "equipment.destroy",
                                                                [equipment],
                                                            ),
                                                        )
                                                    }
                                                />
                                            </div>
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
                        dari {meta.total} Tujuan
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_page && (
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
