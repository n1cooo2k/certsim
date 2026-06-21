import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { BottomNav, Card, Inset, ProgressBar, Screen, Txt } from '@/components/ui';
import { CERTS } from '@/data/questions';
import { useTheme } from '@/theme';

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  const az = CERTS[0];

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 130, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <View>
            <Txt kind="body" color={theme.textSecondary}>
              Hola, Nico 👋
            </Txt>
            <Txt kind="h2" style={{ marginTop: 2 }}>
              ¿Listo para repasar?
            </Txt>
          </View>
          <Card depth={5} blur={10} radius={24} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
            <Txt kind="h3" color={theme.accent}>
              N
            </Txt>
          </Card>
        </View>

        {/* Featured */}
        <Card style={{ padding: 22, gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Txt kind="label" color={theme.accent}>
                CONTINÚA DONDE QUEDASTE
              </Txt>
              <Txt kind="h2" style={{ marginTop: 6 }}>
                {az.name}
              </Txt>
              <Txt kind="caption" color={theme.textSecondary} style={{ marginTop: 2 }}>
                {az.desc}
              </Txt>
            </View>
            <Pressable
              onPress={() => router.push(`/config?cert=${az.id}`)}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: theme.accent,
                alignItems: 'center',
                justifyContent: 'center',
                ...theme.accentGlow,
              }}>
              <Ionicons name="play" size={24} color={theme.accentInk} />
            </Pressable>
          </View>
          <ProgressBar value={az.progress} style={{ marginTop: 4 }} />
          <Txt kind="caption" color={theme.textSecondary}>
            {Math.round(az.progress * 100)}% completado · 30/50 preguntas
          </Txt>
        </Card>

        {/* Certs */}
        <Txt kind="h3" style={{ marginTop: 28, marginBottom: 16 }}>
          Certificaciones
        </Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {CERTS.map((c) => (
            <Card
              key={c.id}
              onPress={() => router.push(`/config?cert=${c.id}`)}
              style={{ width: '46.5%', flexGrow: 1, padding: 18, gap: 10, minHeight: 158 }}>
              <Inset style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={c.icon} size={24} color={theme.accent} />
              </Inset>
              <View style={{ gap: 3, flex: 1 }}>
                <Txt kind="h3" style={{ fontSize: 16 }}>
                  {c.name}
                </Txt>
                <Txt kind="caption" color={theme.textSecondary} style={{ opacity: 0.75 }}>
                  {c.desc}
                </Txt>
              </View>
              <Txt kind="label" color={theme.accent} style={{ letterSpacing: 0 }}>
                {c.questionCount} preguntas
              </Txt>
            </Card>
          ))}
          {/* Próximamente */}
          <Card depth={5} blur={12} style={{ width: '46.5%', flexGrow: 1, padding: 18, gap: 10, minHeight: 158, opacity: 0.6 }}>
            <Inset style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="lock-closed-outline" size={22} color="#7c89a8" />
            </Inset>
            <View style={{ gap: 3, flex: 1 }}>
              <Txt kind="h3" color={theme.textSecondary} style={{ fontSize: 16 }}>
                Próximamente
              </Txt>
              <Txt kind="caption" color={theme.textSecondary} style={{ opacity: 0.75 }}>
                Más certificaciones
              </Txt>
            </View>
            <Txt kind="label" color={theme.textSecondary} style={{ letterSpacing: 0 }}>
              AZ-104 · SAA
            </Txt>
          </Card>
        </View>
      </ScrollView>
      <BottomNav active="home" />
    </Screen>
  );
}
