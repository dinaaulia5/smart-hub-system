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
    IconCalendarEvent,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Index(props) {
    const { data: bookings, meta, links } = props.bookings;

    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };

    UseFilter({
        route: route("booking.index"),
        values: params,
        only: ["bookings"],
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
                            icon={IconCalendarEvent}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route("booking.create")}>
                                <IconPlus className="size-4" />
                                Tambah
                            </Link>
                        </Button>
                    </div>

                    <Filter params={params} setParams={setParams} />
                    <ShowFilter params={params} />
                </CardHeader>

                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {bookings.length === 0 ? (
                        <EmptyState
                            icon={IconCalendarEvent}
                            title="Tidak ada booking"
                            subtitle="Mulailah dengan membuat data booking baru"
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
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

                                    <TableHead>Nama User</TableHead>

                                    <TableHead>Item Dipinjam</TableHead>

                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() =>
                                                onSortTable("start_time")
                                            }
                                        >
                                            Mulai
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() =>
                                                onSortTable("end_time")
                                            }
                                        >
                                            Selesai
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>

                                    <TableHead>Status</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {bookings.map((booking, index) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                (meta.current_page - 1) *
                                                    meta.per_page}
                                        </TableCell>

                                        <TableCell>
                                            {booking.user?.name ?? "-"}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {booking.items?.length > 0
                                                    ? booking.items.map(
                                                          (item) => (
                                                              <span
                                                                  key={item.id}
                                                              >
                                                                  {item.bookable
                                                                      ?.name ??
                                                                      "-"}{" "}
                                                                  ({item.type})
                                                                  x
                                                                  {
                                                                      item.quantity
                                                                  }
                                                              </span>
                                                          ),
                                                      )
                                                    : "-"}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {booking.start_time ?? "-"}
                                        </TableCell>

                                        <TableCell>
                                            {booking.end_time ?? "-"}
                                        </TableCell>

                                        <TableCell>{booking.status}</TableCell>

                                        <TableCell>
                                            {booking.check_in_at ??
                                                "Belum check-in"}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button
                                                    variant="blue"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "booking.edit",
                                                            [booking],
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
                                                                "booking.destroy",
                                                                [booking],
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
                        dari {meta.total} Booking
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
