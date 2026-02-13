import {
  View,
  ViewProps,
  Modal as RNModal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, createContext, useContext, ReactNode } from "react";
import styles from "./styles";

type MenuContextData = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

function Menu({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const { openMenu } = useContext(MenuContext);

  return (
    <TouchableOpacity onPress={openMenu} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { isOpen, closeMenu } = useContext(MenuContext);

  if (!isOpen) return null;

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={closeMenu}
    >
      <Pressable style={styles.overlay} onPress={closeMenu}>
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
}

type ItemProps = ViewProps & {
  icon?: ReactNode;
  onPress?: () => void;
  danger?: boolean;
};

function Item({ children, icon, onPress, danger, style }: ItemProps) {
  const { closeMenu } = useContext(MenuContext);

  const handlePress = () => {
    closeMenu();
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[styles.item, danger && styles.itemDanger, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.itemIcon}>{icon}</View>}
      <View style={styles.itemContent}>{children}</View>
    </TouchableOpacity>
  );
}

Menu.Trigger = Trigger;
Menu.Content = Content;
Menu.Item = Item;

export { Menu };
