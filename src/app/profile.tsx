import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';
import { BottomNav, Card, ProgressBar, Screen, Txt } from '@/components/ui';
import { CERTS } from '@/data/questions';
import { useTheme } from '@/theme';

const HISTORY = [
  { name: 'AZ-900 · Examen', date: 'Hoy', score: '85%', ok: true },
  { name: 'AWS CCP · Repaso', date: 'Ayer', score: '62%', ok: false },
];

export default function Profile() {
  const { theme, toggle } = useTheme();

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Txt kind="h2">Perfil</Txt>
          <Card depth={5} blur={10} radius={14} onPress={toggle} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={theme.name === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={theme.textSecondary} />
          </Card>
        </View>

        {/* Profile card */}
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Txt style={{ fontSize: 26, fontWeight: '800', color: theme.accentInk }}>N</Txt>
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Txt kind="h3" style={{ fontSize: 18 }}>
              Nico
            </Txt>
            <Txt kind="caption" color={theme.textSecondary}>
              Plan gratuito
            </Txt>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: theme.bg, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, ...theme.inset(2, 4) }}>
              <Ionicons name="flame" size={14} color={theme.accent} />
              <Txt kind="label" color={theme.accent} style={{ letterSpacing: 0 }}>
                Racha de 7 días
              </Txt>
            </View>
          </View>
        </Card>

        {/* Global stats */}
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 20 }}>
          {[
            { v: '24', l: 'Exámenes' },
            { v: '78%', l: 'Promedio' },
            { v: '1.9k', l: 'Preguntas' },
          ].map((s) => (
            <Card key={s.l} depth={5} blur={12} radius={18} style={{ flex: 1, alignItems: 'center', paddingVertical: 14, gap: 3 }}>
              <Txt style={{ fontSize: 20, fontWeight: '800', color: theme.accent }}>{s.v}</Txt>
              <Txt kind="caption" color={theme.textSecondary} style={{ fontSize: 11 }}>
                {s.l}
              </Txt>
            </Card>
          ))}
        </View>

        {/* Progress per cert */}
        <Txt kind="label" color={theme.textSecondary} style={{ marginTop: 28, marginBottom: 16, letterSpacing: 1.2 }}>
          PROGRESO POR CERTIFICACIÓN
        </Txt>
        <View style={{ gap: 18 }}>
          {CERTS.map((c) => (
            <View key={c.id} style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Txt kind="h3" style={{ fontSize: 14 }}>
                  {c.name}
                </Txt>
                <Txt kind="h3" color={theme.accent} style={{ fontSize: 13 }}>
                  {Math.round(c.progress * 100)}%
                </Txt>
              </View>
              <ProgressBar value={c.progress} />
            </View>
          ))}
        </View>

        {/* History */}
        <Txt kind="label" color={theme.textSecondary} style={{ marginTop: 28, marginBottom: 14, letterSpacing: 1.2 }}>
          HISTORIAL RECIENTE
        </Txt>
        <View style={{ gap: 12 }}>
          {HISTORY.map((h) => (
            <Card key={h.name} depth={4} blur={10} radius={14} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt kind="h3" style={{ fontSize: 13.5 }}>
                  {h.name}
                </Txt>
                <Txt kind="caption" color={theme.textSecondary}>
                  {h.date}
                </Txt>
              </View>
              <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: h.ok ? theme.green : theme.accent }}>
                <Txt style={{ fontSize: 13, fontWeight: '800', color: theme.accentInk }}>{h.score}</Txt>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
      <BottomNav active="profile" />
    </Screen>
  );
}
