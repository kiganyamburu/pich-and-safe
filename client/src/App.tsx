import { useEffect } from "react";
// ...existing imports...

function App() {
  useEffect(() => {
    // Set default theme to light on app initialization
    const savedTheme = localStorage.getItem("theme");
    const defaultTheme = savedTheme || "light";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(defaultTheme);

    if (!savedTheme) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  // ...rest of your App component
}

export default App;
