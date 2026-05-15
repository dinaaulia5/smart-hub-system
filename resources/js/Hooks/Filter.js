import { Button } from "@/Components/ui/button";
import { Select } from "@/Components/ui/select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@radix-ui/react-select";
import { IconRefresh } from "@tabler/icons-react";

const Filter = ({ params, setParams, state, children }) => {
    const handleClearAll = () => {
        const resETtABLEpARMS = Object.fromEntries;
    };
    return (
        <div className="flex flex-coll w-full gap-4 px-4 py-2 lg:flex-row lg:items-center">
            <input
                className="w-full sm:w-1/4"
                placeholder="Search..."
                value={params?.search}
                onChange={(e) =>
                    setParams((prev) => ({ ...prev, search: e.target.value }))
                }
            />

            <Select
                value={params?.load}
                onValueChange={(e) =>
                    setParams({ ...params, page: 1, load: e })
                }
            >
                <SelectTrigger className="w-full sm:w-24">
                    <SelectValue placeholder="load"> </SelectValue>
                </SelectTrigger>

                <SelectContent>
                    {[10, 25, 50, 75, 10].map((number, index) => (
                        <SelectItem key={index} value={number}>
                            {number}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {children}
            <Button variant="red" size="xl" onClick={handleClearAll}>
                <IconRefresh className="size-4" />
                Bersihkan
            </Button>
        </div>
    );
};

export default Filter;
