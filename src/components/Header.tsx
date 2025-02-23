import ThemeToggle from "@/components/ToggleTheme";

export default function Header() {
    return (
      <header className="flex justify-between p-4 bg-primary text-text-light dark:text-text-dark dark:bg-background-dark">
        <h1 className="text-lg font-bold">Mi Portafolio</h1>
        <ThemeToggle />
      </header>
    );
}
  