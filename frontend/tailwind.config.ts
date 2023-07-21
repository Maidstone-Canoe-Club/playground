import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: "#2D327D"
      }
    }
  },
  plugins: [
    tailwindForms
  ]
};
