import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

/** Contenedor de pantalla con fondo del tema y safe area. */
export function Screen({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <SafeAreaView style={[{ flex: 1, paddingHorizontal: 24 }, style]}>{children}</SafeAreaView>
    </View>
  );
}

type TxtKind = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';
const KIND: Record<TxtKind, TextStyle> = {
  h1: { fontSize: 30, fontWeight: '800' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 17, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '500' },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4 },
  caption: { fontSize: 12, fontWeight: '400' },
};

export function Txt({
  children,
  kind = 'body',
  color,
  style,
  numberOfLines,
  onPress,
}: {
  children: React.ReactNode;
  kind?: TxtKind;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Text onPress={onPress} numberOfLines={numberOfLines} style={[{ color: color ?? theme.textPrimary }, KIND[kind], style]}>
      {children}
    </Text>
  );
}

/** Tarjeta neumórfica elevada. */
export function Card({
  children,
  style,
  depth = 6,
  blur = 16,
  radius = 22,
  onPress,
}: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  depth?: number;
  blur?: number;
  radius?: number;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  const base: ViewStyle = {
    backgroundColor: theme.bg,
    borderRadius: radius,
    ...theme.raised(depth, blur),
  };
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [base, pressed && { opacity: 0.85 }, style]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[base, style]}>{children}</View>;
}

/** Vista neumórfica hundida (badges de íconos, tracks). */
export function Inset({
  children,
  style,
  depth = 3,
  blur = 6,
  radius = 14,
}: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  depth?: number;
  blur?: number;
  radius?: number;
}) {
  const { theme } = useTheme();
  return (
    <View style={[{ backgroundColor: theme.bg, borderRadius: radius, ...theme.inset(depth, blur) }, style]}>
      {children}
    </View>
  );
}

/** Botón primario (acento). */
export function PrimaryButton({
  label,
  icon,
  onPress,
  style,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 58,
          borderRadius: 18,
          backgroundColor: theme.accent,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          ...theme.accentGlow,
        },
        pressed && { opacity: 0.9 },
        style,
      ]}>
      <Text style={{ color: theme.accentInk, fontSize: 16, fontWeight: '800' }}>{label}</Text>
      {icon && <Ionicons name={icon} size={20} color={theme.accentInk} />}
    </Pressable>
  );
}

/** Botón neumórfico secundario (relieve, sin acento). */
export function GhostButton({
  label,
  icon,
  onPress,
  style,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 56,
          borderRadius: 18,
          backgroundColor: theme.bg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          ...theme.raised(5, 12),
        },
        pressed && { opacity: 0.85 },
        style,
      ]}>
      {icon && <Ionicons name={icon} size={20} color={theme.accent} />}
      <Text style={{ color: theme.textPrimary, fontSize: 15, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}

/** Botón de ícono neumórfico (atrás, ajustes). */
export function IconButton({
  icon,
  onPress,
  size = 44,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: theme.bg,
          alignItems: 'center',
          justifyContent: 'center',
          ...theme.raised(5, 10),
        },
        pressed && { opacity: 0.7 },
      ]}>
      <Ionicons name={icon} size={size * 0.45} color={theme.textSecondary} />
    </Pressable>
  );
}

/** Barra de progreso. */
export function ProgressBar({ value, style }: { value: number; style?: StyleProp<ViewStyle> }) {
  const { theme } = useTheme();
  return (
    <View style={[{ height: 8, borderRadius: 4, backgroundColor: theme.track, overflow: 'hidden' }, style]}>
      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.accent,
          width: `${Math.max(0, Math.min(1, value)) * 100}%`,
        }}
      />
    </View>
  );
}

/** Bottom nav con FAB central. */
export function BottomNav({ active }: { active: 'home' | 'stats' | 'saved' | 'profile' }) {
  const { theme } = useTheme();
  const router = useRouter();
  const Item = ({
    name,
    icon,
    to,
  }: {
    name: typeof active;
    icon: keyof typeof Ionicons.glyphMap;
    to: string;
  }) => (
    <Pressable onPress={() => router.push(to as any)} hitSlop={12}>
      <Ionicons name={icon} size={26} color={active === name ? theme.accent : '#7c89a8'} />
    </Pressable>
  );
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 92,
        backgroundColor: theme.bg,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        boxShadow: `0px -6px 14px ${theme.shadowLight}`,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 36,
          paddingTop: 26,
        }}>
        <Item name="home" icon="home" to="/home" />
        <Item name="stats" icon="stats-chart" to="/profile" />
        <View style={{ width: 60 }} />
        <Item name="saved" icon="bookmark-outline" to="/home" />
        <Item name="profile" icon="person" to="/profile" />
      </View>
      <Pressable
        onPress={() => router.push('/config')}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: -32,
          width: 66,
          height: 66,
          borderRadius: 33,
          backgroundColor: theme.accent,
          alignItems: 'center',
          justifyContent: 'center',
          ...theme.accentGlow,
        }}>
        <Ionicons name="flash" size={30} color={theme.accentInk} />
      </Pressable>
    </View>
  );
}
