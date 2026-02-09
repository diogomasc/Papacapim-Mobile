import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import styles, { variants } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

function Button({
  children,
  style,
  isLoading = false,
  variant = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  const componentStyle = variants[variant];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        componentStyle.container,
        disabled && styles.disabled,
        style,
      ]}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={componentStyle.loadingColor} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}

function Label({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.label, style]} {...rest}>
      {children}
    </Text>
  );
}

type IconProps = {
  children: React.ReactNode;
};

function Icon({ children }: IconProps) {
  return <>{children}</>;
}

Button.Title = Title;
Button.Label = Label;
Button.Icon = Icon;

export { Button };
