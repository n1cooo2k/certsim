import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Card, GhostButton, PrimaryButton, Screen, Txt } from '@/components/ui';
import { getCert } from '@/data/questions';
import { useTheme } from '@/theme';

const R = 78;
const C = 2 * Math.PI * R;

export default function Results() {
  const { theme } = useTheme();
  const router = useRouter();
  const { cert: certId, correct, total, mode } = useLocalSearchParams<{
    cert?: string;
    correct?: string;
    total?: string;
    mode?: string;
  }>();
  const cert = getCert(certId ?? '');
  const nCorrect = Number(correct ?? 0);
  const nTotal = Number(total ?? 1);
  const pct = Math.round((nCorrect / nTotal) * 100);
  const passed = pct >= 70;

  return (
    <Screen>
      <View style={{ flex: 1, paddingTop: 16 }}>
        <Txt kind="h2" style={{ textAlign: 'center' }}>
          ¡Examen completado!
        </Txt>
        <Txt kind="caption" color={theme.textSecondary} style={{ textAlign: 'center', marginTop: 6 }}>
          {cert?.name ?? 'Cert'} · Modo {mode === 'repaso' ? 'repaso' : 'examen'}
        </Txt>

        {/* Score ring */}
        <View style={{ alignSelf: 'center', marginTop: 28, width: 200, height: 200 }}>
          <Card radius={100} depth={10} blur={24} style={{ width: 200, height: 200 }} />
          <View style={{ position: 'absolute', width: 200, height: 200, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={200} height={200}>
              <Circle cx={100} cy={100} r={R} stroke={theme.track} strokeWidth={14} fill="none" />
              <Circle
                cx={100}
                cy={100}
                r={R}
                stroke={theme.accent}
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct / 100)}
                transform="rotate(-90 100 100)"
              />
            </Svg>
            <View style={{ position: 'absolute', alignItems: 'center' }}>
              <Txt style={{ fontSize: 46, fontWeight: '800' }}>{pct}%</Txt>
              <Txt kind="caption" color={theme.textSecondary} style={{ marginTop: 2 }}>
                {nCorrect} de {nTotal} correctas
              </Txt>
            </View>
          </View>
        </View>

        {/* Badge */}
        <View
          style={{
            alignSelf: 'center',
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 18,
            height: 40,
            borderRadius: 20,
            backgroundColor: passed ? theme.accent : theme.bg,
            ...(passed ? {} : theme.raised(5, 12)),
          }}>
          <Ionicons
            name={passed ? 'checkmark-circle' : 'close-circle'}
            size={18}
            color={passed ? theme.accentInk : theme.red}
          />
          <Txt kind="h3" color={passed ? theme.accentInk : theme.red} style={{ fontSize: 15 }}>
            {passed ? '¡Aprobado!' : 'Sigue practicando'}
          </Txt>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 28 }}>
          {[
            { v: String(nCorrect), l: 'Correctas', c: theme.accent },
            { v: String(nTotal - nCorrect), l: 'Incorrectas', c: theme.textSecondary },
            { v: '11:24', l: 'Tiempo', c: theme.textPrimary },
          ].map((s) => (
            <Card key={s.l} depth={5} blur={12} radius={18} style={{ flex: 1, alignItems: 'center', paddingVertical: 16, gap: 3 }}>
              <Txt style={{ fontSize: 22, fontWeight: '800', color: s.c }}>{s.v}</Txt>
              <Txt kind="caption" color={theme.textSecondary} style={{ fontSize: 11 }}>
                {s.l}
              </Txt>
            </Card>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={{ paddingBottom: 16, gap: 12 }}>
        <GhostButton label="Revisar respuestas" icon="eye-outline" onPress={() => router.replace(`/exam?cert=${certId}&mode=repaso`)} />
        <PrimaryButton label="Reintentar examen" icon="refresh" onPress={() => router.replace(`/exam?cert=${certId}&mode=examen`)} />
        <Txt kind="caption" color={theme.textSecondary} onPress={() => router.replace('/home')} style={{ textAlign: 'center', opacity: 0.7, paddingVertical: 4 }}>
          Volver al inicio
        </Txt>
      </View>
    </Screen>
  );
}
