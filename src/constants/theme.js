
export const COLORS = {
  primary: "#3E307F",
  primaryLight: "#4937B9",

  secondary: "#FFA51F",
  secondaryLight: "#FFF0D9",

  background: "#F5F5F5",
  surface: "#FFFFFF",

  text: "#292929",
  textSecondary: "#777777",
  textLight: "#FFFFFF",

  border: "#E5E5E5",

  success: "#20C65A",
  successLight: "#D9FFE2",

  danger: "#E53935",
  dangerLight: "#FFE0E0",

  warning: "#FFA51F",
  warningLight: "#FFF0D9",

  purple: "#5138D9",
  purpleLight: "#E5DEFF",
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  cardRadius: 12,
  buttonRadius: 8,
};

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

export const SHADOWS = {
  card: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const THEME = {
  colors: COLORS,
  sizes: SIZES,
  breakpoints: BREAKPOINTS,
  shadows: SHADOWS,
};
