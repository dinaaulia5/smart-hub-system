const EmptyState = ({
    title = "Tidak ada data",
    subtitle = "Mulailah dengan membuat data baru",
    icon: Icon,
}) => {
    return (
        <div className="flex flex-col items-center border border-dashed border-secondary p-4 ">
            <Icon className="size-12 text-emerald-500" />
            <h3 className="mt-2 text-lg font-semibold text-foreground">
                {title}
            </h3>
            <a className="mt-1 text-sm text-mute-foreground">{subtitle}</a>
        </div>
    );
};

export default EmptyState;
