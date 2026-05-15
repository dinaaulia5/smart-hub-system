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

const Create = (props) => {
    const { data, setData, errors, post, processing, reset } = useForm({
        name: "",
        code: "",
        capacity: 1,
        location: "",
        status: "available",
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
                            <Link href={route("room.index")}>
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
                            <Label htmlFor="name">Nama Ruangan</Label>

                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukan nama ruangan"
                                value={data.name}
                                onChange={onHandleChange}
                            />

                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>

                        {/* CODE */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="code">Kode Ruangan</Label>

                            <Input
                                type="text"
                                name="code"
                                id="code"
                                placeholder="Masukan kode ruangan"
                                value={data.code}
                                onChange={onHandleChange}
                            />

                            {errors.code && (
                                <InputError message={errors.code} />
                            )}
                        </div>

                        {/* CAPACITY */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="capacity">Kapasitas</Label>

                            <Input
                                type="number"
                                name="capacity"
                                id="capacity"
                                placeholder="Masukan kapasitas ruangan"
                                value={data.capacity}
                                onChange={onHandleChange}
                                min="1"
                            />

                            {errors.capacity && (
                                <InputError message={errors.capacity} />
                            )}
                        </div>

                        {/* LOCATION */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="location">Lokasi</Label>

                            <Input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Masukan lokasi ruangan"
                                value={data.location}
                                onChange={onHandleChange}
                            />

                            {errors.location && (
                                <InputError message={errors.location} />
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

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.pageSettings.title} />
);

export default Create;
