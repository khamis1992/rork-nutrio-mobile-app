import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}, ref) => {
  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...sizeStyles[size],
    };

    if (disabled) {
      return {
        ...baseStyle,
        ...styles.disabled,
      };
    }

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...textSizeStyles[size],
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: colors.textLight,
      };
    }

    return {
      ...baseStyle,
      ...textVariantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={[getButtonStyles(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'text' ? colors.primary : colors.white} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const variantStyles = {
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  text: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    paddingHorizontal: 0,
  },
};

const textVariantStyles = {
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.white,
  },
  outline: {
    color: colors.primary,
  },
  text: {
    color: colors.primary,
  },
};

const sizeStyles = {
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
  },
};

const textSizeStyles = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
});