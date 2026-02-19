import { createSystem, defaultConfig, defineRecipe } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  globalCss: {
    '*': {
      boxSizing: 'border-box',
      fontFamily: 'body',
      lineHeight: 'moderate',
      fontWeight: 'light',
    },
    'html, body': {
      minWidth: 'breakpoint-xs',
      minHeight: 'full',
      fontFamily: { base: 'body' },
    },
  },
  theme: {
    breakpoints: {
      base: '0em',
      xs: '22.5rem',
      sm: '30rem',
      md: '48rem',
      lg: '62rem',
      xl: '80rem',
      '2xl': '85.375rem',
      '3xl': '90rem',
      '4xl': '96rem',
      '5xl': '108rem',
      '6xl': '120rem',
    },
    tokens: {
      colors: {
        primary: {
          100: { value: '#f7eae7' },
          200: { value: '#f3dfdb' },
          300: { value: '#e6bdb5' },
          400: { value: '#AE2A10' },
          500: { value: '#9d260e' },
          600: { value: '#8b220d' },
          700: { value: '#83200c' },
          800: { value: '#68190a' },
        },
        secondary: {
          100: { value: '#faf0e7' },
          200: { value: '#f8e8da' },
          300: { value: '#f1cfb3' },
          400: { value: '#d1650a' },
          500: { value: '#bc5b09' },
          600: { value: '#a75108' },
          700: { value: '#9d4c08' },
          800: { value: '#7d3d06' },
          900: { value: '#5e2d05' },
        },
        icon: {
          400: { value: '#696A6B' },
          700: { value: '#181818' },
        },
        radial: {
          100: { value: 'radial-gradient(#971900 , #3e1007)' },
        },
        tertiary: {
          100: { value: '#ffffff' },
          200: { value: '#e8fff2' },
          300: { value: '#f3f4fa' },
          400: { value: '#e9ebf8' },
          500: { value: '#130f26' },
          600: { value: '#28ba67' },
          700: { value: '#075493' },
        },
        text: {
          100: { value: '#e8e8e8' },
          200: { value: '#dcdcdc' },
          300: { value: '#b7b7b7' },
          350: { value: '#696A6B' },
          400: { value: '#181817' },
          500: { value: '#161615' },
          600: { value: '#131312' },
          700: { value: '#121211' },
          800: { value: '#0e0e0e' },
          900: { value: '#0b0b0a' },
        },
        onboarding: {
          blue: { value: '#E6EEF4' },
          'border-blue': { value: '#73A1C7' },
          green: { value: '#EAF8F0' },
          'border-green': { value: '#28BA67' },
          orange: { value: '#FCF2E6' },
        },
      },
      fonts: {
        body: { value: 'Manrope, Poppins, sans-serif' },
        heading: { value: 'Manrope, Poppins, sans-serif' },
      },
    },
  },
  strictTokens: true,
});

export const buttonRecipe = defineRecipe({
  base: {
    transition: 'all',
    transitionDuration: 'slow',
    _disabled: {
      cursor: 'disabled',
    },
  },
  variants: {
    visual: {
      solid: {
        bg: 'primary.400',
        color: '#FFFFFF',
        _hover: { bg: 'primary.100', color: 'primary.400' },
        _active: { bg: 'primary.600' },
      },
      outline: {
        bg: '#FFFFFF',
        borderColor: 'primary.400',
        color: 'primary.400',
        _hover: { bg: 'primary.400', color: '#FFFFFF' },
        _active: { bg: 'primary.400' },
      },
      ghost: {
        color: 'primary.500',
        _hover: { bg: 'primary.100' },
        _active: { bg: 'primary.200' },
      },
      plain: {
        background: 'transparent',
        color: 'primary.400',
        _hover: { bg: 'transparent', borderColor: 'primary.400' },
        _active: { bg: 'transparent' },
      },
    },
    size: {
      sm: { h: '8', px: '3', fontSize: 'sm' },
      md: { h: '10', px: '4', fontSize: 'md' },
      lg: { h: '10', px: '30', fontSize: 'lg', w: '60' },
      xs: { h: '6', px: '38', fontSize: 'xs', w: 'auto' },
      xl: { h: '12', px: '32', fontSize: 'xl', w: 'auto' },
      '2xl': { h: '14', px: '34', fontSize: '2xl', w: 'auto' },
      '2xs': { h: '16', px: '36', fontSize: '2xs', w: 'auto' },
    },
  },
  // defaultVariants: {
  //   visual: 'solid',
  //   size: 'md',
  // },
});
