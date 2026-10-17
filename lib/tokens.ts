// Generated from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit by hand.
export const scales = {
  "blue": [
    {
      "step": "50",
      "hex": "#F1F6FE",
      "note": null
    },
    {
      "step": "100",
      "hex": "#E0ECFE",
      "note": null
    },
    {
      "step": "200",
      "hex": "#C3DBFE",
      "note": null
    },
    {
      "step": "300",
      "hex": "#96BFFF",
      "note": null
    },
    {
      "step": "400",
      "hex": "#5C99FF",
      "note": "Brand text and links on dark surfaces (6.85:1 on Ink)."
    },
    {
      "step": "500",
      "hex": "#0062FF",
      "note": "Signal Blue. The logo colour; never shift it."
    },
    {
      "step": "600",
      "hex": "#014FDD",
      "note": "Links and small brand text on white (6.64:1)."
    },
    {
      "step": "700",
      "hex": "#043EB5",
      "note": null
    },
    {
      "step": "800",
      "hex": "#062F8C",
      "note": null
    },
    {
      "step": "900",
      "hex": "#072163",
      "note": null
    },
    {
      "step": "950",
      "hex": "#051540",
      "note": null
    }
  ],
  "oxide": [
    {
      "step": "50",
      "hex": "#FEF5EE",
      "note": null
    },
    {
      "step": "100",
      "hex": "#FFE8D9",
      "note": null
    },
    {
      "step": "200",
      "hex": "#FFD2B7",
      "note": null
    },
    {
      "step": "300",
      "hex": "#FEB38D",
      "note": null
    },
    {
      "step": "400",
      "hex": "#FE8F5D",
      "note": null
    },
    {
      "step": "500",
      "hex": "#FF5E14",
      "note": "Oxide. Parity colour and the single focal accent; about 10% of any layout."
    },
    {
      "step": "600",
      "hex": "#D9480F",
      "note": null
    },
    {
      "step": "700",
      "hex": "#B33A10",
      "note": "Oxide text on light surfaces (5.95:1 on white)."
    },
    {
      "step": "800",
      "hex": "#8D2E12",
      "note": null
    },
    {
      "step": "900",
      "hex": "#692311",
      "note": null
    },
    {
      "step": "950",
      "hex": "#47180D",
      "note": null
    }
  ],
  "neutral": [
    {
      "step": "0",
      "hex": "#FFFFFF",
      "note": null
    },
    {
      "step": "25",
      "hex": "#FAFBFD",
      "note": null
    },
    {
      "step": "50",
      "hex": "#F4F6F9",
      "note": "Paper. Light alternate surface."
    },
    {
      "step": "100",
      "hex": "#EAEDF2",
      "note": null
    },
    {
      "step": "200",
      "hex": "#DCE0E6",
      "note": null
    },
    {
      "step": "300",
      "hex": "#C4C9D2",
      "note": null
    },
    {
      "step": "400",
      "hex": "#9AA0AC",
      "note": null
    },
    {
      "step": "500",
      "hex": "#757C88",
      "note": "Steel. Hairlines and non-essential labels only (4.2:1 on white)."
    },
    {
      "step": "600",
      "hex": "#5A616D",
      "note": null
    },
    {
      "step": "700",
      "hex": "#424853",
      "note": null
    },
    {
      "step": "800",
      "hex": "#2B313A",
      "note": null
    },
    {
      "step": "850",
      "hex": "#1E232B",
      "note": null
    },
    {
      "step": "900",
      "hex": "#13171E",
      "note": null
    },
    {
      "step": "950",
      "hex": "#0B0E14",
      "note": "Ink. Primary dark surface and text colour."
    },
    {
      "step": "1000",
      "hex": "#06070B",
      "note": null
    }
  ],
  "green": [
    {
      "step": "500",
      "hex": "#02A855",
      "note": "Online / healthy on dark surfaces."
    },
    {
      "step": "700",
      "hex": "#037E3F",
      "note": "Online / healthy text on light surfaces."
    }
  ],
  "amber": [
    {
      "step": "500",
      "hex": "#F7AE0C",
      "note": "Degraded on dark surfaces."
    },
    {
      "step": "700",
      "hex": "#A06604",
      "note": "Degraded text on light surfaces."
    }
  ],
  "red": [
    {
      "step": "400",
      "hex": "#FF6B78",
      "note": "Offline / error text on dark surfaces."
    },
    {
      "step": "500",
      "hex": "#E42E41",
      "note": "Offline / error fills."
    },
    {
      "step": "700",
      "hex": "#C51B32",
      "note": "Offline / error text on light surfaces."
    }
  ],
  "teal": [
    {
      "step": "500",
      "hex": "#00AEAE",
      "note": null
    }
  ],
  "violet": [
    {
      "step": "500",
      "hex": "#7D5BE6",
      "note": null
    }
  ],
  "sky": [
    {
      "step": "500",
      "hex": "#61C3F9",
      "note": null
    }
  ]
} as const;

export const brandColors = [
  {
    "name": "signal",
    "ref": "{color.blue.500}",
    "hex": "#0062FF",
    "note": "Primary brand colour."
  },
  {
    "name": "oxide",
    "ref": "{color.oxide.500}",
    "hex": "#FF5E14",
    "note": "Parity / accent."
  },
  {
    "name": "ink",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14",
    "note": "Dark surface."
  },
  {
    "name": "steel",
    "ref": "{color.neutral.500}",
    "hex": "#757C88",
    "note": "Neutral mid-tone."
  },
  {
    "name": "paper",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9",
    "note": "Light surface."
  }
] as const;

export const syntax = [
  {
    "role": "background",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14",
    "note": "Code surface (Ink)."
  },
  {
    "role": "foreground",
    "ref": "{color.neutral.100}",
    "hex": "#EAEDF2",
    "note": "Plain code and identifiers."
  },
  {
    "role": "comment",
    "ref": "{color.neutral.500}",
    "hex": "#757C88",
    "note": "Comments (4.6:1)."
  },
  {
    "role": "punctuation",
    "ref": "{color.neutral.400}",
    "hex": "#9AA0AC",
    "note": "Punctuation and operators."
  },
  {
    "role": "keyword",
    "ref": "{color.blue.400}",
    "hex": "#5C99FF",
    "note": "Keywords, tags, shell commands."
  },
  {
    "role": "function",
    "ref": "{color.blue.300}",
    "hex": "#96BFFF",
    "note": "Functions, types, components, CSS selectors."
  },
  {
    "role": "property",
    "ref": "{color.blue.200}",
    "hex": "#C3DBFE",
    "note": "Properties, attributes, keys, flags."
  },
  {
    "role": "string",
    "ref": "#6BDFCA",
    "hex": "#6BDFCA",
    "note": "Strings and values; a light teal from data colour 3."
  },
  {
    "role": "number",
    "ref": "{color.oxide.400}",
    "hex": "#FE8F5D",
    "note": "Numbers, units and constants."
  }
] as const;

export const dataviz = [
  {
    "index": 1,
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "index": 2,
    "ref": "{color.oxide.500}",
    "hex": "#FF5E14"
  },
  {
    "index": 3,
    "ref": "{color.teal.500}",
    "hex": "#00AEAE"
  },
  {
    "index": 4,
    "ref": "{color.violet.500}",
    "hex": "#7D5BE6"
  },
  {
    "index": 5,
    "ref": "{color.amber.500}",
    "hex": "#F7AE0C"
  },
  {
    "index": 6,
    "ref": "{color.sky.500}",
    "hex": "#61C3F9"
  },
  {
    "index": 7,
    "ref": "{color.green.500}",
    "hex": "#02A855"
  },
  {
    "index": 8,
    "ref": "{color.neutral.400}",
    "hex": "#9AA0AC"
  }
] as const;

export const semantic = {
  light: [
  {
    "name": "background",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "card",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "card-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "popover",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "popover-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "primary",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "primary-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "secondary",
    "ref": "{color.neutral.100}",
    "hex": "#EAEDF2"
  },
  {
    "name": "secondary-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "muted",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "muted-foreground",
    "ref": "{color.neutral.600}",
    "hex": "#5A616D"
  },
  {
    "name": "accent",
    "ref": "{color.neutral.100}",
    "hex": "#EAEDF2"
  },
  {
    "name": "accent-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "destructive",
    "ref": "{color.red.700}",
    "hex": "#C51B32"
  },
  {
    "name": "destructive-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "border",
    "ref": "{color.neutral.200}",
    "hex": "#DCE0E6"
  },
  {
    "name": "input",
    "ref": "{color.neutral.300}",
    "hex": "#C4C9D2"
  },
  {
    "name": "ring",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "chart-1",
    "ref": "{color.dataviz.1}",
    "hex": "#0062FF"
  },
  {
    "name": "chart-2",
    "ref": "{color.dataviz.2}",
    "hex": "#FF5E14"
  },
  {
    "name": "chart-3",
    "ref": "{color.dataviz.3}",
    "hex": "#00AEAE"
  },
  {
    "name": "chart-4",
    "ref": "{color.dataviz.4}",
    "hex": "#7D5BE6"
  },
  {
    "name": "chart-5",
    "ref": "{color.dataviz.5}",
    "hex": "#F7AE0C"
  },
  {
    "name": "sidebar",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "sidebar-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "sidebar-primary",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "sidebar-primary-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "sidebar-accent",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "sidebar-accent-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "sidebar-border",
    "ref": "{color.neutral.200}",
    "hex": "#DCE0E6"
  },
  {
    "name": "sidebar-ring",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "brand",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "brand-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "link",
    "ref": "{color.blue.600}",
    "hex": "#014FDD"
  },
  {
    "name": "parity",
    "ref": "{color.oxide.500}",
    "hex": "#FF5E14"
  },
  {
    "name": "parity-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "parity-text",
    "ref": "{color.oxide.700}",
    "hex": "#B33A10"
  },
  {
    "name": "subtle",
    "ref": "{color.neutral.700}",
    "hex": "#424853"
  },
  {
    "name": "faint",
    "ref": "{color.neutral.600}",
    "hex": "#5A616D"
  },
  {
    "name": "strong",
    "ref": "{color.neutral.300}",
    "hex": "#C4C9D2"
  },
  {
    "name": "surface",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "surface-2",
    "ref": "{color.neutral.100}",
    "hex": "#EAEDF2"
  },
  {
    "name": "success",
    "ref": "{color.green.700}",
    "hex": "#037E3F"
  },
  {
    "name": "warning",
    "ref": "{color.amber.700}",
    "hex": "#A06604"
  },
  {
    "name": "danger",
    "ref": "{color.red.700}",
    "hex": "#C51B32"
  },
  {
    "name": "info",
    "ref": "{color.blue.600}",
    "hex": "#014FDD"
  },
  {
    "name": "stage",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "stage-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "selection",
    "ref": "{color.blue.100}",
    "hex": "#E0ECFE"
  }
],
  dark: [
  {
    "name": "background",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "card",
    "ref": "{color.neutral.900}",
    "hex": "#13171E"
  },
  {
    "name": "card-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "popover",
    "ref": "{color.neutral.900}",
    "hex": "#13171E"
  },
  {
    "name": "popover-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "primary",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "primary-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "secondary",
    "ref": "{color.neutral.850}",
    "hex": "#1E232B"
  },
  {
    "name": "secondary-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "muted",
    "ref": "{color.neutral.900}",
    "hex": "#13171E"
  },
  {
    "name": "muted-foreground",
    "ref": "{color.neutral.400}",
    "hex": "#9AA0AC"
  },
  {
    "name": "accent",
    "ref": "{color.neutral.850}",
    "hex": "#1E232B"
  },
  {
    "name": "accent-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "destructive",
    "ref": "{color.red.400}",
    "hex": "#FF6B78"
  },
  {
    "name": "destructive-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "border",
    "ref": "{color.neutral.800}",
    "hex": "#2B313A"
  },
  {
    "name": "input",
    "ref": "{color.neutral.700}",
    "hex": "#424853"
  },
  {
    "name": "ring",
    "ref": "{color.blue.400}",
    "hex": "#5C99FF"
  },
  {
    "name": "chart-1",
    "ref": "{color.dataviz.1}",
    "hex": "#0062FF"
  },
  {
    "name": "chart-2",
    "ref": "{color.dataviz.2}",
    "hex": "#FF5E14"
  },
  {
    "name": "chart-3",
    "ref": "{color.dataviz.3}",
    "hex": "#00AEAE"
  },
  {
    "name": "chart-4",
    "ref": "{color.dataviz.4}",
    "hex": "#7D5BE6"
  },
  {
    "name": "chart-5",
    "ref": "{color.dataviz.5}",
    "hex": "#F7AE0C"
  },
  {
    "name": "sidebar",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "sidebar-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "sidebar-primary",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "sidebar-primary-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "sidebar-accent",
    "ref": "{color.neutral.900}",
    "hex": "#13171E"
  },
  {
    "name": "sidebar-accent-foreground",
    "ref": "{color.neutral.50}",
    "hex": "#F4F6F9"
  },
  {
    "name": "sidebar-border",
    "ref": "{color.neutral.800}",
    "hex": "#2B313A"
  },
  {
    "name": "sidebar-ring",
    "ref": "{color.blue.400}",
    "hex": "#5C99FF"
  },
  {
    "name": "brand",
    "ref": "{color.blue.500}",
    "hex": "#0062FF"
  },
  {
    "name": "brand-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "link",
    "ref": "{color.blue.400}",
    "hex": "#5C99FF"
  },
  {
    "name": "parity",
    "ref": "{color.oxide.500}",
    "hex": "#FF5E14"
  },
  {
    "name": "parity-foreground",
    "ref": "{color.neutral.950}",
    "hex": "#0B0E14"
  },
  {
    "name": "parity-text",
    "ref": "{color.oxide.400}",
    "hex": "#FE8F5D"
  },
  {
    "name": "subtle",
    "ref": "{color.neutral.300}",
    "hex": "#C4C9D2"
  },
  {
    "name": "faint",
    "ref": "{color.neutral.400}",
    "hex": "#9AA0AC"
  },
  {
    "name": "strong",
    "ref": "{color.neutral.700}",
    "hex": "#424853"
  },
  {
    "name": "surface",
    "ref": "{color.neutral.900}",
    "hex": "#13171E"
  },
  {
    "name": "surface-2",
    "ref": "{color.neutral.850}",
    "hex": "#1E232B"
  },
  {
    "name": "success",
    "ref": "{color.green.500}",
    "hex": "#02A855"
  },
  {
    "name": "warning",
    "ref": "{color.amber.500}",
    "hex": "#F7AE0C"
  },
  {
    "name": "danger",
    "ref": "{color.red.400}",
    "hex": "#FF6B78"
  },
  {
    "name": "info",
    "ref": "{color.blue.400}",
    "hex": "#5C99FF"
  },
  {
    "name": "stage",
    "ref": "{color.neutral.1000}",
    "hex": "#06070B"
  },
  {
    "name": "stage-foreground",
    "ref": "{color.neutral.0}",
    "hex": "#FFFFFF"
  },
  {
    "name": "selection",
    "ref": "#0062FF59",
    "hex": "#0062FF59"
  }
],
} as const;

export const fonts = [
  {
    "role": "display",
    "stack": [
      "Archivo",
      "HarmonyOS Sans SC",
      "Source Han Sans SC",
      "Noto Sans SC",
      "PingFang SC",
      "Microsoft YaHei",
      "sans-serif"
    ],
    "note": "Archivo variable, set at 112–125% width. Headlines and numerals only."
  },
  {
    "role": "sans",
    "stack": [
      "Geist",
      "HarmonyOS Sans SC",
      "Source Han Sans SC",
      "Noto Sans SC",
      "PingFang SC",
      "Microsoft YaHei",
      "system-ui",
      "sans-serif"
    ],
    "note": "Body copy and interface."
  },
  {
    "role": "mono",
    "stack": [
      "Geist Mono",
      "SF Mono",
      "ui-monospace",
      "Menlo",
      "Consolas",
      "PingFang SC",
      "monospace"
    ],
    "note": "Labels, data, code, key paths."
  }
] as const;

export const typography = [
  {
    "name": "display-2xl",
    "fontFamily": "display",
    "fontSize": "128px",
    "fontWeight": 800,
    "lineHeight": 0.92,
    "letterSpacing": "-0.03em",
    "fontStretch": "125%"
  },
  {
    "name": "display-xl",
    "fontFamily": "display",
    "fontSize": "96px",
    "fontWeight": 800,
    "lineHeight": 0.94,
    "letterSpacing": "-0.025em",
    "fontStretch": "125%"
  },
  {
    "name": "display-lg",
    "fontFamily": "display",
    "fontSize": "72px",
    "fontWeight": 800,
    "lineHeight": 0.96,
    "letterSpacing": "-0.02em",
    "fontStretch": "125%"
  },
  {
    "name": "display-md",
    "fontFamily": "display",
    "fontSize": "56px",
    "fontWeight": 800,
    "lineHeight": 1,
    "letterSpacing": "-0.02em",
    "fontStretch": "125%"
  },
  {
    "name": "headline-lg",
    "fontFamily": "display",
    "fontSize": "40px",
    "fontWeight": 750,
    "lineHeight": 1.08,
    "letterSpacing": "-0.01em",
    "fontStretch": "112%"
  },
  {
    "name": "headline-md",
    "fontFamily": "display",
    "fontSize": "30px",
    "fontWeight": 700,
    "lineHeight": 1.15,
    "letterSpacing": "-0.01em",
    "fontStretch": "112%"
  },
  {
    "name": "headline-sm",
    "fontFamily": "sans",
    "fontSize": "22px",
    "fontWeight": 600,
    "lineHeight": 1.3,
    "letterSpacing": "-0.005em"
  },
  {
    "name": "title",
    "fontFamily": "sans",
    "fontSize": "18px",
    "fontWeight": 600,
    "lineHeight": 1.4,
    "letterSpacing": "0em"
  },
  {
    "name": "body-lg",
    "fontFamily": "sans",
    "fontSize": "18px",
    "fontWeight": 400,
    "lineHeight": 1.7,
    "letterSpacing": "0em"
  },
  {
    "name": "body-md",
    "fontFamily": "sans",
    "fontSize": "16px",
    "fontWeight": 400,
    "lineHeight": 1.7,
    "letterSpacing": "0em"
  },
  {
    "name": "body-sm",
    "fontFamily": "sans",
    "fontSize": "14px",
    "fontWeight": 400,
    "lineHeight": 1.6,
    "letterSpacing": "0em"
  },
  {
    "name": "caption",
    "fontFamily": "sans",
    "fontSize": "12px",
    "fontWeight": 400,
    "lineHeight": 1.5,
    "letterSpacing": "0em"
  },
  {
    "name": "label-md",
    "fontFamily": "mono",
    "fontSize": "12px",
    "fontWeight": 500,
    "lineHeight": 1.3,
    "letterSpacing": "0.08em",
    "textTransform": "uppercase"
  },
  {
    "name": "label-sm",
    "fontFamily": "mono",
    "fontSize": "11px",
    "fontWeight": 500,
    "lineHeight": 1.3,
    "letterSpacing": "0.08em",
    "textTransform": "uppercase"
  },
  {
    "name": "code",
    "fontFamily": "mono",
    "fontSize": "14px",
    "fontWeight": 400,
    "lineHeight": 1.65,
    "letterSpacing": "0em"
  },
  {
    "name": "numeral",
    "fontFamily": "display",
    "fontSize": "48px",
    "fontWeight": 800,
    "lineHeight": 1,
    "letterSpacing": "-0.02em",
    "fontStretch": "125%",
    "fontFeature": "\"tnum\" 1"
  }
] as const;

export const space = [
  {
    "step": "0",
    "value": "0px"
  },
  {
    "step": "1",
    "value": "4px"
  },
  {
    "step": "2",
    "value": "8px"
  },
  {
    "step": "3",
    "value": "12px"
  },
  {
    "step": "4",
    "value": "16px"
  },
  {
    "step": "5",
    "value": "20px"
  },
  {
    "step": "6",
    "value": "24px"
  },
  {
    "step": "8",
    "value": "32px"
  },
  {
    "step": "10",
    "value": "40px"
  },
  {
    "step": "12",
    "value": "48px"
  },
  {
    "step": "16",
    "value": "64px"
  },
  {
    "step": "20",
    "value": "80px"
  },
  {
    "step": "24",
    "value": "96px"
  },
  {
    "step": "32",
    "value": "128px"
  }
] as const;

export const motion = {
  duration: [
  {
    "name": "instant",
    "value": "80ms",
    "note": null
  },
  {
    "name": "fast",
    "value": "150ms",
    "note": null
  },
  {
    "name": "base",
    "value": "240ms",
    "note": null
  },
  {
    "name": "slow",
    "value": "420ms",
    "note": null
  },
  {
    "name": "scene",
    "value": "720ms",
    "note": null
  },
  {
    "name": "stagger",
    "value": "40ms",
    "note": "Delay between shards in a write sequence."
  }
],
  easing: [
  {
    "name": "standard",
    "value": [
      0.2,
      0,
      0,
      1
    ],
    "css": "cubic-bezier(0.2, 0, 0, 1)",
    "note": "Default for state changes."
  },
  {
    "name": "emphasized",
    "value": [
      0.16,
      1,
      0.3,
      1
    ],
    "css": "cubic-bezier(0.16, 1, 0.3, 1)",
    "note": "Entrances and the heal finish."
  },
  {
    "name": "exit",
    "value": [
      0.4,
      0,
      1,
      1
    ],
    "css": "cubic-bezier(0.4, 0, 1, 1)",
    "note": "Elements leaving the screen."
  }
],
} as const;
