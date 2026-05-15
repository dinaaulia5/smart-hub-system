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
import { IconArrowBack, IconCheck, IconUsers } from "@tabler/icons-react";
import { toast } from "sonner";

const Edit = (props) => {
    const user = props.user;

    const { data, setData, errors, post, processing, reset } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "user",
        password: "",
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
                if (flash) toast[flash.type](flash.message);
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
                            icon={IconUsers}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route("users.index")}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukan nama pengguna"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Masukan email pengguna"
                                value={data.email}
                                onChange={onHandleChange}
                            />
                            {errors.email && (
                                <InputError message={errors.email} />
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                name="role"
                                id="role"
                                value={data.role}
                                onChange={onHandleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {props.roles.map((role, index) => (
                                    <option key={index} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <InputError message={errors.role} />
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password Baru</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Kosongkan jika tidak ingin mengubah password"
                                value={data.password}
                                onChange={onHandleChange}
                            />
                            {errors.password && (
                                <InputError message={errors.password} />
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
                                Update
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
