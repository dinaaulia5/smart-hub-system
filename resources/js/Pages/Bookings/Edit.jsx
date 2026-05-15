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
import { IconArrowBack, IconCheck, IconTool } from "@tabler/icons-react";
import { toast } from "sonner";

const Edit = (props) => {
    const { data, setData, errors, post, processing, reset } = useForm({
        name: props.equipment.name ?? "",
        brand: props.equipment.brand ?? "",
        stock: props.equipment.stock ?? 0,
        status: props.equipment.status ?? "available",
        _method: props.pageSettings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

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
                            icon={IconTool}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route("equipment.index")}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        {/* NAME */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nama Equipment</Label>

                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukan nama equipment"
                                value={data.name}
                                onChange={onHandleChange}
                            />

                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>

                        {/* BRAND */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="brand">Brand</Label>

                            <Input
                                type="text"
                                name="brand"
                                id="brand"
                                placeholder="Masukan brand"
                                value={data.brand}
                                onChange={onHandleChange}
                            />

                            {errors.brand && (
                                <InputError message={errors.brand} />
                            )}
                        </div>

                        {/* STOCK */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="stock">Stock</Label>

                            <Input
                                type="number"
                                name="stock"
                                id="stock"
                                placeholder="Masukan stock"
                                value={data.stock}
                                onChange={onHandleChange}
                                min="0"
                            />

                            {errors.stock && (
                                <InputError message={errors.stock} />
                            )}
                        </div>

                        {/* STATUS */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="status">Status</Label>

                            <select
                                name="status"
                                id="status"
                                value={data.status}
                                onChange={onHandleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {props.statuses.map((status, index) => (
                                    <option key={index} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>

                            {errors.status && (
                                <InputError message={errors.status} />
                            )}
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
    <AppLayout children={page} title={page.props.pageSettings.title} />
);

export default Edit;
