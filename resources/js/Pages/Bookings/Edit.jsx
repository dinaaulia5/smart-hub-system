import BreadcrumbHeader from "@/Components/BreadcrumbHeader";
import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import {
    IconArrowBack,
    IconCalendarEvent,
    IconCheck,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";

const Edit = (props) => {
    const booking = props.booking;

    const { data, setData, errors, post, processing, reset } = useForm({
        user_id: booking?.user_id ?? "",
        start_time: booking?.start_time ?? "",
        end_time: booking?.end_time ?? "",
        items: booking?.items ?? [
            {
                type: "room",
                id: "",
                quantity: 1,
            },
        ],
        _method: props.pageSettings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const updateItem = (index, field, value) => {
        const updatedItems = [...data.items];

        updatedItems[index][field] = value;

        if (field === "type") {
            updatedItems[index].id = "";
            updatedItems[index].quantity = 1;
        }

        setData("items", updatedItems);
    };

    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                type: "room",
                id: "",
                quantity: 1,
            },
        ]);
    };

    const removeItem = (index) => {
        const updatedItems = data.items.filter((_, i) => i !== index);
        setData("items", updatedItems);
    };

    const getOptions = (type) => {
        return type === "room" ? props.rooms : props.equipments;
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.pageSettings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);

                if (flash) {
                    toast[flash.type](flash.message);
                }
            },
        });
    };

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />

            <Card>
                <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.pageSettings.title}
                            subTitle={props.pageSettings.subtitle}
                            icon={IconCalendarEvent}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route("booking.index")}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5" onSubmit={onHandleSubmit}>
                        {/* USER */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="user_id">Pengguna</Label>

                            <select
                                name="user_id"
                                id="user_id"
                                value={data.user_id}
                                onChange={onHandleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Pilih pengguna</option>
                                {props.users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} - {user.email}
                                    </option>
                                ))}
                            </select>

                            {errors.user_id && (
                                <InputError message={errors.user_id} />
                            )}
                        </div>

                        {/* START TIME */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="start_time">Waktu Mulai</Label>

                            <Input
                                type="datetime-local"
                                name="start_time"
                                id="start_time"
                                value={data.start_time}
                                onChange={onHandleChange}
                            />

                            {errors.start_time && (
                                <InputError message={errors.start_time} />
                            )}
                        </div>

                        {/* END TIME */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="end_time">Waktu Selesai</Label>

                            <Input
                                type="datetime-local"
                                name="end_time"
                                id="end_time"
                                value={data.end_time}
                                onChange={onHandleChange}
                            />

                            {errors.end_time && (
                                <InputError message={errors.end_time} />
                            )}
                        </div>

                        {/* ITEMS */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>Item Booking</Label>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addItem}
                                >
                                    <IconPlus className="size-4" />
                                    Tambah Item
                                </Button>
                            </div>

                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 rounded-xl border p-4 lg:grid-cols-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label>Jenis</Label>

                                        <select
                                            value={item.type}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "type",
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="room">Room</option>
                                            <option value="equipment">
                                                Equipment
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2 lg:col-span-2">
                                        <Label>Item</Label>

                                        <select
                                            value={item.id}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "id",
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">Pilih item</option>

                                            {getOptions(item.type).map(
                                                (option) => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                    >
                                                        {item.type === "room"
                                                            ? `${option.name} - ${option.code}`
                                                            : `${option.name} - ${option.brand} (stok: ${option.stock})`}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label>Quantity</Label>

                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                disabled={item.type === "room"}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "quantity",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            {data.items.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="red"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                >
                                                    <IconTrash className="size-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {errors[`items.${index}.id`] && (
                                        <div className="lg:col-span-4">
                                            <InputError
                                                message={
                                                    errors[`items.${index}.id`]
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                size="xl"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>

                            <Button
                                type="submit"
                                variant="emerald"
                                size="xl"
                                disabled={processing}
                            >
                                <IconCheck />
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Edit.layout = (page) => (
    <AppLayout title={page.props.pageSettings.title} children={page} />
);

export default Edit;
