import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useTheme } from "./ThemeProvider";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <Button
            variant="emerald"
            size="xl"
            className="ml-auto"
            onClick={toggleTheme}
        >
            {theme == "dark" ? (
                <IconSun className="text-white size-10" />
            ) : (
                <IconMoon className="size-10" />
            )}
        </Button>
    );
};

export default ThemeSwitcher;
