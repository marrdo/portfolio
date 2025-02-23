"use client"; // Indica que este código solo debe ejecutarse en el cliente (no en el servidor de Next.js)

import { useEffect, useState } from "react"; // Importamos los hooks useState y useEffect

export default function ThemeToggle() {
  // Estado para almacenar el tema actual (puede ser "light" o "dark")
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Intentamos obtener la preferencia de tema almacenada en localStorage
    const savedTheme = localStorage.getItem("colorTheme");

    // Si el usuario ya guardó "dark" o si no hay preferencia guardada pero su sistema usa modo oscuro
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark"); // Agrega la clase "dark" al <html> para aplicar estilos oscuros
      setTheme("dark"); // Actualiza el estado para reflejar que el tema es oscuro
    } else {
      document.documentElement.classList.remove("dark"); // Si el tema no es oscuro, aseguramos que la clase "dark" no esté en <html>
      setTheme("light"); // Establecemos el tema como claro
    }
  }, []); // [] significa que este efecto solo se ejecuta una vez, al montar el componente

  // Función para cambiar el tema cuando el usuario pulsa el botón
  const toggleTheme = () => {
    // Cambia entre "light" y "dark"
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // Actualiza el estado del tema

    // Alterna la clase "dark" en el elemento <html>, si el tema es oscuro la añade, si es claro la quita
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Guarda la preferencia en localStorage para recordar el tema al recargar la página
    localStorage.setItem("colorTheme", newTheme);
  };

  return (
    // Botón para cambiar el tema, con estilos de Tailwind para darle diseño
    <button onClick={toggleTheme} className="p-2 border rounded-lg">
      {/* Muestra un icono diferente según el tema actual */}
      {theme === "dark" ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
}
