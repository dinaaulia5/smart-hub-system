import { router } from "@inertiajs/react";
import { clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { id } from "date-fns/locale";
import { Title } from "@radix-ui/react-dialog";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// FLASH MESSAGE
function flashMessage(params) {
    return params.props.flash_message;
}

// ACTION DELETE

const deleteAction = (url, { closeModal, ...options } = {}) => {
    const defaultOptions = {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (success) => {
            const flash = flashMessage(success);

            if (flash) {
                toast[flash.type](flash.message);
            }

            if (closeModal && typeof closeModal == "function") {
                closeModal();
            }
        },

        ...options,
    };

    router.delete(url, defaultOptions);
};

// FORMAT DATE
const formatDateIndo = (dateString) => {
    if (!dateString) return "-";

    return format(parseISO(dateString), "eeee, dd MMMM yyyy", {
        locale: id,
    });
};

// FORMAT IDR
const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};

const BUDGETTYPE = {
    INCOME: "Penghasilan",
    SAVING: "Tabungan dan Investasi",
    DEBT: "Cicilan Hutang",
    BIL: "Tagihan",
    SHOPPING: "Belanja",
};

const BUDGETTYPEVARIANT = {
    [BUDGETTYPE.INCOME]: "emerald",
    [BUDGETTYPE.SAVING]: "orange",
    [BUDGETTYPE.DEBT]: "red",
    [BUDGETTYPE.BIL]: "sky",
    [BUDGETTYPE.SHOPPING]: "purple",
};

const MONTHTYPE = {
    JANUARI: "Januari",
    FEBRUARI: "Februari",
    MARET: "Maret",
    APRIL: "April",
    MEI: "Mei",
    JUNI: "Juni",
    JULI: "Juli",
    AGUSTUS: "Agustus",
    SEPTEMBER: "September",
    OKTOBER: "Oktober",
    NOVEMBER: "November",
    DESEMBER: "Desember",
};

const MONTHTYPEVARIANT = {
    [MONTHTYPE.JANUARI]: "fuchsia",
    [MONTHTYPE.FEBRUARI]: "orange",
    [MONTHTYPE.MARET]: "emerald",
    [MONTHTYPE.APRIL]: "sky",
    [MONTHTYPE.MEI]: "purple",
    [MONTHTYPE.JUNI]: "rose",
    [MONTHTYPE.JULI]: "pink",
    [MONTHTYPE.AGUSTUS]: "red",
    [MONTHTYPE.SEPTEMBER]: "violet",
    [MONTHTYPE.OKTOBER]: "blue",
    [MONTHTYPE.NOVEMBER]: "lime",
    [MONTHTYPE.DESEMBER]: "teal",
};

const ASETTYPE = {
    CASH: "Kas",
    PERSONAL: "Personal",
    SHORTTERM: "Investasi Jangka Pendek",
    MIDTERM: "Investasi Jangka Tengah",
    LONGTERM: "Investasi Jangka Panjang",
};

const ASETTYPEVARIANT = {
    [ASETTYPE.CASH]: "emerald",
    [ASETTYPE.PERSONAL]: "orange",
    [ASETTYPE.SHORTTERM]: "red",
    [ASETTYPE.MIDTERM]: "sky",
    [ASETTYPE.LONGTERM]: "purple",
};

const LIABILITYTYPE = {
    SHORTTERMDEBT: "Hutang Jangka Pendek",
    MIDTERMDEBT: "Hutang Jangka Tengah",
    LONGTERMDEBT: "Hutang Jangka Panjang",
};

const LIABILITYTYPEVARIANT = {
    [LIABILITYTYPE.SHORTTERMDEBT]: "emerald",
    [LIABILITYTYPE.MIDTERMDEBT]: "orange",
    [LIABILITYTYPE.LONGTERMDEBT]: "red",
};

const LIABILITYDESCRIPTION = {
    [LIABILITYTYPE.SHORTTERMDEBT]: "Teno",
    [LIABILITYTYPE.MIDTERMDEBT]: "orange",
    [LIABILITYTYPE.LONGTERMDEBT]: "red",
};

const message = {
    503: {
        title: "Service Unavailable",
        description:
            "Sorry, we are doing some maintenance. Please check back soon",
        status: 503,
    },

    500: {
        title: "Server Error",
        description: "Oops, something went wrong",
        status: 500,
    },
    404: {
        title: "Not Found",
        description: "Sory, the page you are looking for could not be found",
        status: 404,
    },
    403: {
        title: "Forbidden",
        description: "Sory, you are forbidden from accessing this page",
        status: 403,
    },
    401: {
        title: "Unauthorized",
        description: "Sory, you are unauthorized to access this page",
        status: 401,
    },
    429: {
        title: "To many request",
        description: "Please try again in just a second",
        status: 429,
    },
};

export {
    cn,
    flashMessage,
    deleteAction,
    formatDateIndo,
    formatToRupiah,
    BUDGETTYPE,
    BUDGETTYPEVARIANT,
    MONTHTYPE,
    MONTHTYPEVARIANT,
    ASETTYPE,
    ASETTYPEVARIANT,
    LIABILITYTYPE,
    LIABILITYTYPEVARIANT,
    LIABILITYDESCRIPTION,
    message,
};
