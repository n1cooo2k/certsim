import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Card, IconButton, Inset, PrimaryButton, Screen, Txt } from '@/components/ui';
import { CERTS, getCert } from '@/data/questions';
import { useTheme } from '@/theme';

const COUNTS = ['10', '20', '40', 'Todas'];

export default function Config() {
  const { theme } = useTheme();
  const router = useRouter();
  const { cert: certId } = useLocalSearchParams<{ cert?: string }>();
  const cert = getCert(certId ?? '') ?? CERTS[0];

  const [mode, setMode] = useState<'examen' | 'repaso'>('examen');
  const [count, setCount] = useState(1);
  const [domains, setDomains] = useState<boolean[]>(cert.domains.map((_, i) => i < 3));

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <IconButton icon="chevron-back" onPress={() => router.back()} />
          <Txt kind="h3" style={{ fontSize: 18 }}>
            Configurar examen
          </Txt>
        </View>

        {/* Cert header */}
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20 }}>
          <Inset radius={16} style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={cert.icon} size={30} color={theme.accent} />
          </Inset>
          <View style={{ flex: 1, gap: 3 }}>
            <Txt kind="h3" style={{ fontSize: 18 }}>
              {cert.name}
            </Txt>
            <Txt kind="caption" color={theme.textSecondary}>
              {cert.desc}
            </Txt>
            <Txt kind="label" color={theme.accent} style={{ letterSpacing: 0 }}>
              {cert.questionCount} preguntas disponibles
            </Txt>
          </View>
        </Card>

        {/* Mode */}
        <Txt kind="label" color={theme.textSecondary} style={{ marginTop: 28, marginBottom: 14 }}>
          MODO
        </Txt>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {([
            { key: 'examen', title: 'Examen', desc: 'Con tiempo y nota', icon: 'timer-outline' },
            { key: 'repaso', title: 'Repaso', desc: 'Sin tiempo, con explicación', icon: 'book-outline' },
          ] as const).map((m) => {
            const sel = mode === m.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => setMode(m.key)}
                style={[
                  { flex: 1, borderRadius: 18, padding: 16, gap: 8, minHeight: 104 },
                  sel
                    ? { backgroundColor: theme.accent, ...theme.accentGlow }
                    : { backgroundColor: theme.bg, ...theme.raised(5, 12) },
                ]}>
                <Ionicons name={m.icon} size={24} color={sel ? theme.accentInk : theme.accent} />
                <Txt kind="h3" color={sel ? theme.accentInk : theme.textPrimary} style={{ fontSize: 16 }}>
                  {m.title}
                </Txt>
                <Txt kind="caption" color={sel ? theme.accentInk : theme.textSecondary} style={sel ? { opacity: 0.85 } : undefined}>
                  {m.desc}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        {/* Count */}
        <Txt kind="label" color={theme.textSecondary} style={{ marginTop: 28, marginBottom: 14 }}>
          NÚMERO DE PREGUNTAS
        </Txt>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {COUNTS.map((n, i) => {
            const sel = count === i;
            return (
              <Pressable
                key={n}
                onPress={() => setCount(i)}
                style={[
                  { flex: 1, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
                  sel ? { backgroundColor: theme.accent } : { backgroundColor: theme.bg, ...theme.raised(4, 9) },
                ]}>
                <Txt kind="h3" color={sel ? theme.accentInk : theme.textPrimary} style={{ fontSize: 15 }}>
                  {n}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        {/* Domains */}
        <Txt kind="label" color={theme.textSecondary} style={{ marginTop: 28, marginBottom: 14 }}>
          DOMINIOS
        </Txt>
        <View style={{ gap: 10 }}>
          {cert.domains.map((d, i) => {
            const on = domains[i];
            return (
              <Pressable
                key={d}
                onPress={() => setDomains((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 52,
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  backgroundColor: theme.bg,
                  ...theme.raised(4, 10),
                }}>
                <Txt kind="body" color={on ? theme.textPrimary : theme.textSecondary} style={{ flex: 1 }}>
                  {d}
                </Txt>
                {on ? (
                  <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark" size={18} color={theme.accentInk} />
                  </View>
                ) : (
                  <Inset radius={8} style={{ width: 26, height: 26 }} depth={2} blur={4} />
                )}
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton
          label="Comenzar examen"
          icon="play"
          style={{ marginTop: 28 }}
          onPress={() => router.push(`/exam?cert=${cert.id}&mode=${mode}`)}
        />
      </ScrollView>
    </Screen>
  );
}
