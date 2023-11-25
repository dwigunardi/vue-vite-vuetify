import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#1E202C",
          secondary: "#424242",
          accent: "#03001C",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background: "#1E1E1E",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#03001C",
          secondary: "#5B8FB9",
          accent: "#1E202C",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background: "#1E1E1E",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
});
