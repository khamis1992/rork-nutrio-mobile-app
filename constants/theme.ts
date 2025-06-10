import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    body: {
      fontSize: 16,
      color: colors.text,
    },
    bodySmall: {
      fontSize: 14,
      color: colors.textLight,
    },
    caption: {
      fontSize: 12,
      color: colors.textLight,
    },
  },
  shadows: {
    small: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: theme.spacing.md,
  },
});