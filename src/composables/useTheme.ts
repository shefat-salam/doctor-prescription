import { provide, inject, ref } from 'vue'
import type { Ref } from 'vue'
import { lightTheme, type Theme } from '../theme'

const ThemeSymbol = Symbol('theme')

export function provideTheme(theme: Theme = lightTheme) {
  const currentTheme = ref<Theme>(theme)
  
  provide(ThemeSymbol, currentTheme)
  
  return {
    theme: currentTheme,
    setTheme: (newTheme: Theme) => {
      currentTheme.value = newTheme
    },
  }
}

export function useTheme(): Ref<Theme> {
  const theme = inject<Ref<Theme>>(ThemeSymbol)
  
  if (!theme) {
    throw new Error('useTheme() must be called within a component that has been provided with a theme')
  }
  
  return theme
}
