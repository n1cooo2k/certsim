import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Inset, PrimaryButton, Screen, Txt } from '@/components/ui';
import { useTheme } from '@/theme';

const FEATURES: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [
  { icon: 'checkmark-done', text: 'Simulacros tipo examen real' },
  { icon: 'bulb-outline', text: 'Modo repaso con explicaciones' },
  { icon: 'stats-chart', text: 'Seguimiento de tu progreso' },
];

export default function Onboarding() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Logo */}
        <View
          style={{
            alignSelf: 'center',
            width: 96,
            height: 96,
            borderRadius: 28,
            backgroundColor: theme.accent,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.accentGlow,
          }}>
          <Ionicons name="flash" size={48} color={theme.accentInk} />
        </View>

        <Txt kind="h1" style={{ textAlign: 'center', marginTop: 26, fontSize: 38 }}>
          CertSim
        </Txt>
        <Txt kind="body" color={theme.textSecondary} style={{ textAlign: 'center', marginTop: 12, lineHeight: 21, paddingHorizontal: 20 }}>
          Repasa para tus certificaciones tech sin complicarte. Simulacros reales, donde quieras.
        </Txt>

        <View style={{ gap: 14, marginTop: 38, paddingHorizontal: 16 }}>
          {FEATURES.map((f) => (
            <View key={f.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Inset style={{ width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={f.icon} size={22} color={theme.accent} />
              </Inset>
              <Txt kind="body" style={{ fontSize: 14.5 }}>
                {f.text}
              </Txt>
            </View>
          ))}
        </View>
      </View>

      <View style={{ paddingBottom: 20, gap: 18 }}>
        <PrimaryButton label="Empezar a repasar" onPress={() => router.replace('/home')} />
        <Pressable onPress={() => router.replace('/home')}>
          <Txt kind="body" color={theme.textSecondary} style={{ textAlign: 'center', opacity: 0.8 }}>
            Ya tengo una cuenta
          </Txt>
        </Pressable>
      </View>
    </Screen>
  );
}
