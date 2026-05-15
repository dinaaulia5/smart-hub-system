import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Fragment } from "react";

function BreadcrumbHeader({ items }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <BreadcrumbLink href={item.href}>
                                    {item.label}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>

                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadcrumbHeader;
