import { mode } from "@chakra-ui/theme-tools"

const styles = {
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "JetBrains Mono, monospace",
  },

  lineHeights: {
    base: 1.75,
  },

  sizes: {
    container: {
      md: "75ch",
    },
  },

  colors: {
    gray: {
      "50": "#f0f2f4",
      "100": "#d5d9e1",
      "200": "#bbc1ce",
      "300": "#a0a9bb",
      "400": "#8591a8",
      "500": "#6b7994",
      "600": "#556077",
      "700": "#404859",
      "800": "#2b303b",
      "900": "#15181e",
    },
    red: {
      "50": "#f8edee",
      "100": "#eacccf",
      "200": "#ddacb0",
      "300": "#d08b91",
      "400": "#c36a73",
      "500": "#b54a54",
      "600": "#913b43",
      "700": "#6d2c32",
      "800": "#491d22",
      "900": "#240f11",
    },
    orange: {
      "50": "#f9efec",
      "100": "#edd2c9",
      "200": "#e2b5a7",
      "300": "#d79884",
      "400": "#cb7b62",
      "500": "#c05e3f",
      "600": "#9a4b32",
      "700": "#733826",
      "800": "#4d2619",
      "900": "#26130d",
    },
    yellow: {
      "50": "#fbf5e9",
      "100": "#f4e4c2",
      "200": "#eed29b",
      "300": "#e7c174",
      "400": "#e0af4d",
      "500": "#d99d26",
      "600": "#ae7e1e",
      "700": "#825e17",
      "800": "#573f0f",
      "900": "#2b1f08",
    },
    green: {
      "50": "#f2f6ef",
      "100": "#dbe5d1",
      "200": "#c3d5b4",
      "300": "#acc497",
      "400": "#94b379",
      "500": "#7da35c",
      "600": "#64824a",
      "700": "#4b6237",
      "800": "#324125",
      "900": "#192112",
    },
    teal: {
      "50": "#eff5f5",
      "100": "#d2e4e4",
      "200": "#b6d3d2",
      "300": "#99c2c1",
      "400": "#7cb1b0",
      "500": "#5fa09e",
      "600": "#4c807f",
      "700": "#39605f",
      "800": "#26403f",
      "900": "#132020",
    },
    cyan: {
      "50": "#edf5f8",
      "100": "#cce4eb",
      "200": "#abd2de",
      "300": "#8ac1d1",
      "400": "#69b0c4",
      "500": "#489eb7",
      "600": "#3a7f92",
      "700": "#2b5f6e",
      "800": "#1d3f49",
      "900": "#0e2025",
    },
    blue: {
      "50": "#eef2f7",
      "100": "#cfdbe7",
      "200": "#b0c4d8",
      "300": "#92adc9",
      "400": "#7396ba",
      "500": "#547fab",
      "600": "#436689",
      "700": "#324c67",
      "800": "#223344",
      "900": "#111922",
    },
    purple: {
      "50": "#f5f0f4",
      "100": "#e3d4e0",
      "200": "#d0b8cc",
      "300": "#be9db8",
      "400": "#ac81a4",
      "500": "#996690",
      "600": "#7b5173",
      "700": "#5c3d56",
      "800": "#3d293a",
      "900": "#1f141d",
    },
    pink: {
      "50": "#f7eeed",
      "100": "#eacecd",
      "200": "#dcafad",
      "300": "#ce8f8d",
      "400": "#c0706c",
      "500": "#b3504c",
      "600": "#8f403d",
      "700": "#6b302e",
      "800": "#47201f",
      "900": "#24100f",
    },
  },

  textStyles: {
    paragraph: {
      width: {
        base: "clamp(30ch, 100%, 40ch)",
        sm: "clamp(45ch, 100%, 75ch)",
      },
      lineHeight: "1.5",
      fontSize: { base: "1rem", md: "1.125rem" },
    },
    feature: {
      width: {
        base: "clamp(30ch, 100%, 40ch)",
        sm: "clamp(38ch, 100%, 75ch)",
      },
      lineHeight: { base: "base", xl: "short" },
      fontSize: { base: "1rem", md: "1.125rem" },
    },
  },

  //  globals
  styles: {
    global: props => ({
      html: {
        scrollBehavior: "smooth",
      },
      "html body": {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        background: mode("gray.50", "gray.900")(props),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        color: mode("gray.700", "gray.100")(props),
        fontFeatureSettings: '"ss03", "zero", "cv08", "cv11", "kern"',
      },
      "p, ul, ol": {
        marginBottom: "1rem",
      },
      "p + p": {
        marginTop: "1.5rem",
      },
      li: {
        lineHeight: "1.4",
      },
      "li::marker": {
        color: "gray.400",
      },
    }),
  },
}

export default styles
