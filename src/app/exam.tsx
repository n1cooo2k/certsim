import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Card, GhostButton, IconButton, PrimaryButton, Screen, Txt } from '@/components/ui';
import { getCert, questionsForCert, QUESTIONS } from '@/data/questions';
import { useTheme } from '@/theme';

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

export default function Exam() {
  const { theme } = useTheme();
  const router = useRouter();
  const { cert: certId, mode } = useLocalSearchParams<{ cert?: string; mode?: string }>();
  const repaso = mode === 'repaso';
  const cert = getCert(certId ?? '');

  const qs = useMemo(() => {
    const list = questionsForCert(certId ?? '');
    return list.length ? list : QUESTIONS;
  }, [certId]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => qs.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(20 * 60);

  const q = qs[idx];
  const chosen = answers[idx];
  const isLast = idx === qs.length - 1;

  useEffect(() => {
    if (repaso) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [repaso]);

  function select(i: number) {
    if (repaso && revealed) return;
    setAnswers((a) => a.map((v, k) => (k === idx ? i : v)));
    if (repaso) setRevealed(true);
  }

  function finish() {
    const correct = qs.reduce((acc, qq, i) => acc + (answers[i] === qq.answer ? 1 : 0), 0);
    router.replace(`/results?cert=${certId}&correct=${correct}&total=${qs.length}&mode=${mode}`);
  }

  function next() {
    if (isLast) return finish();
    setIdx((i) => i + 1);
    setRevealed(false);
  }
  function prev() {
    if (idx === 0) return;
    setIdx((i) => i - 1);
    setRevealed(repaso);
  }

  return (
    <Screen>
      {/* Top bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 16 }}>
        <IconButton icon="chevron-back" onPress={() => router.back()} />
        <Txt kind="h3" style={{ fontSize: 16 }}>
          {repaso ? 'Repaso' : 'Pregunta'} {idx + 1}/{qs.length}
        </Txt>
        {repaso ? (
          <View style={{ width: 60, height: 36, borderRadius: 10, borderWidth: 1.5, borderColor: theme.green, alignItems: 'center', justifyContent: 'center' }}>
            <Txt kind="h3" color={theme.green} style={{ fontSize: 12 }}>
              Repaso
            </Txt>
          </View>
        ) : (
          <Card depth={5} blur={10} radius={14} style={{ height: 44, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons name="time-outline" size={15} color={theme.accent} />
            <Txt kind="h3" color={theme.accent} style={{ fontSize: 13 }}>
              {fmt(seconds)}
            </Txt>
          </Card>
        )}
      </View>

      {/* Progress segments */}
      <View style={{ flexDirection: 'row', gap: 4, marginBottom: 24 }}>
        {qs.map((_, i) => (
          <View
            key={i}
            style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: i <= idx ? theme.accent : theme.track }}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <Card style={{ padding: 22, gap: 9 }}>
          <Txt kind="label" color={theme.accent}>
            {(cert?.name ?? 'CERT').toUpperCase()} · {q.domain.toUpperCase()}
          </Txt>
          <Txt kind="h3" style={{ fontSize: 16.5, lineHeight: 23 }}>
            {q.question}
          </Txt>
        </Card>

        {/* Options */}
        <View style={{ gap: 12, marginTop: 22 }}>
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isChosen = chosen === i;
            const isCorrect = i === q.answer;
            let borderColor: string | undefined;
            let badgeBg = theme.bg;
            let badgeIcon: keyof typeof Ionicons.glyphMap | null = null;
            let dim = false;

            if (repaso && revealed) {
              if (isCorrect) {
                borderColor = theme.green;
                badgeBg = theme.green;
                badgeIcon = 'checkmark';
              } else if (isChosen) {
                borderColor = theme.red;
                badgeBg = theme.red;
                badgeIcon = 'close';
              } else {
                dim = true;
              }
            } else if (!repaso && isChosen) {
              borderColor = theme.accent;
              badgeBg = theme.accent;
            }

            return (
              <Pressable
                key={i}
                onPress={() => select(i)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 60,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: theme.bg,
                  opacity: dim ? 0.55 : 1,
                  ...(borderColor ? { borderWidth: 1.6, borderColor } : {}),
                  ...theme.raised(4, 10),
                }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: badgeBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(badgeBg === theme.bg ? theme.raised(3, 6) : {}),
                  }}>
                  {badgeIcon ? (
                    <Ionicons name={badgeIcon} size={18} color={theme.accentInk} />
                  ) : (
                    <Txt kind="h3" color={isChosen && !repaso ? theme.accentInk : theme.textSecondary} style={{ fontSize: 13 }}>
                      {letter}
                    </Txt>
                  )}
                </View>
                <Txt kind="body" style={{ flex: 1, fontSize: 14 }}>
                  {opt}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        {/* Explanation (repaso) */}
        {repaso && revealed && (
          <Card depth={6} blur={14} radius={20} style={{ padding: 20, gap: 10, marginTop: 22 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="bulb-outline" size={18} color={theme.accent} />
              <Txt kind="label" color={theme.accent} style={{ letterSpacing: 1 }}>
                EXPLICACIÓN
              </Txt>
            </View>
            <Txt kind="caption" color={theme.textSecondary} style={{ fontSize: 13.5, lineHeight: 20 }}>
              {q.explanation}
            </Txt>
          </Card>
        )}
      </ScrollView>

      {/* Bottom actions */}
      <View style={{ paddingVertical: 14, flexDirection: 'row', gap: 12 }}>
        {repaso && (
          <GhostButton label="Anterior" icon="chevron-back" onPress={prev} style={{ width: 130 }} />
        )}
        <PrimaryButton
          label={isLast ? 'Finalizar' : 'Siguiente'}
          icon="arrow-forward"
          onPress={next}
          style={{ flex: 1 }}
        />
      </View>
    </Screen>
  );
}
