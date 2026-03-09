/**
 * Comprehensive Theme Configuration
 * Centralized color and styling system for consistent UI
 */

// Theme Colors
export const THEME = {
  // Primary Brand Colors (Admin - Purple/Indigo)
  admin: {
    primary: 'from-purple-600 to-indigo-600',
    light: 'from-purple-400 to-indigo-500',
    bg: 'bg-purple-100',
    bgHover: 'hover:bg-purple-200',
    text: 'text-purple-700',
    border: 'border-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
    buttonLight: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
  },

  // Secondary Brand Colors (Doctor - Green/Teal)
  doctor: {
    primary: 'from-green-600 to-teal-600',
    light: 'from-green-400 to-teal-500',
    bg: 'bg-green-100',
    bgHover: 'hover:bg-green-200',
    text: 'text-green-700',
    border: 'border-green-500',
    button: 'bg-green-600 hover:bg-green-700 text-white',
    buttonLight: 'bg-green-100 hover:bg-green-200 text-green-700',
  },

  // Neutral/Common Colors
  common: {
    bg: 'bg-white',
    bgSecondary: 'bg-gray-100',
    bgTertiary: 'bg-gray-50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-500',
    border: 'border-gray-200',
    shadow: 'shadow-lg',
    shadowMd: 'shadow-md',
    shadowSm: 'shadow-sm',
  },

  // Status Colors (Success, Error, Warning, Info)
  status: {
    success: 'bg-green-50 border-l-4 border-green-500 text-green-700',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
  },

  // Button Variants
  buttons: {
    primary: 'px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200',
    secondary: 'px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200',
    danger: 'px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200',
    dangerLight: 'px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition duration-200',
    success: 'px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200',
    outline: 'px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-200',
  },

  // Navigation Items
  nav: {
    active: 'bg-purple-100 text-purple-700',
    activeDoctor: 'bg-green-100 text-green-700',
    inactive: 'text-gray-700 hover:bg-gray-100',
    text: 'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
  },

  // Cards & Containers
  cards: {
    base: 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200',
    small: 'bg-white rounded-lg shadow-sm p-4',
    border: 'border border-gray-200',
  },

  // Inputs & Forms
  inputs: {
    bg: 'bg-gray-50',
    border: 'border-2 border-gray-200',
    focus: 'focus:bg-white focus:border-purple-500 focus:outline-none',
    text: 'placeholder-gray-400',
  },

  // Typography
  typography: {
    heading1: 'text-4xl font-bold',
    heading2: 'text-2xl font-bold',
    heading3: 'text-xl font-bold',
    heading4: 'text-lg font-bold',
    bodyLarge: 'text-base font-normal',
    body: 'text-sm font-normal',
    small: 'text-xs font-normal',
    label: 'text-sm font-semibold',
  },

  // Spacing
  spacing: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },

  // Transitions
  transitions: {
    default: 'transition duration-200',
    fast: 'transition duration-100',
    slow: 'transition duration-300',
  },
}

/**
 * Get role-specific theme
 * @param {string} role - User role ('admin' or 'doctor')
 * @returns {object} Theme configuration for the role
 */
export function getRoleTheme(role: string) {
  return role === 'admin' ? THEME.admin : THEME.doctor
}

/**
 * Button class generator
 * @param {string} variant - Button variant ('primary', 'danger', etc)
 * @returns {string} Tailwind classes for button
 */
export function getButtonClass(variant: string = 'primary'): string {
  return (THEME.buttons as Record<string, string>)[variant] || THEME.buttons.primary
}

/**
 * Nav item class generator
 * @param {boolean} isActive - Whether nav item is active
 * @param {string} role - User role for active state color
 * @returns {string} Combined Tailwind classes
 */
export function getNavItemClass(isActive: boolean, role: string = 'admin'): string {
  const baseClasses = THEME.nav.text
  if (!isActive) return `${baseClasses} ${THEME.nav.inactive}`
  const activeTheme = role === 'admin' ? THEME.nav.active : THEME.nav.activeDoctor
  return `${baseClasses} ${activeTheme}`
}
