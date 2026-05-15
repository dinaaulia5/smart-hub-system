function Banner({ title, subTitle }) {
    return (
        <div className="flex flex-col p-4 text-white rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100">
            <h2 className="text-2xl font-medium leading-relaxed tracking-white">
                {title}
            </h2>
            <p className="text-sm leading-relaxed">{subTitle}</p>
        </div>
    );
}

export default Banner;
