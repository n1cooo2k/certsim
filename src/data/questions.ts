import { Ionicons } from '@expo/vector-icons';

export interface Cert {
  id: string;
  name: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  questionCount: number;
  domains: string[];
  progress: number; // 0..1
  soon?: boolean;
}

export interface Question {
  id: string;
  cert: string;
  domain: string;
  question: string;
  options: string[];
  answer: number; // índice de la opción correcta
  explanation: string;
}

export const CERTS: Cert[] = [
  {
    id: 'az-900',
    name: 'AZ-900',
    desc: 'Azure Fundamentals',
    icon: 'cloud-outline',
    questionCount: 120,
    progress: 0.6,
    domains: ['Conceptos de nube', 'Servicios principales de Azure', 'Seguridad y cumplimiento', 'Precios y soporte (SLA)'],
  },
  {
    id: 'aws-ccp',
    name: 'AWS CCP',
    desc: 'Cloud Practitioner',
    icon: 'server-outline',
    questionCount: 95,
    progress: 0.35,
    domains: ['Conceptos de nube', 'Seguridad', 'Tecnología', 'Facturación y precios'],
  },
  {
    id: 'comptia-a',
    name: 'CompTIA A+',
    desc: 'Core 1 & 2',
    icon: 'desktop-outline',
    questionCount: 80,
    progress: 0.15,
    domains: ['Hardware', 'Redes', 'Sistemas operativos', 'Seguridad'],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: 'az900-1',
    cert: 'az-900',
    domain: 'Conceptos de nube',
    question: '¿Qué modelo de servicio en la nube ofrece máquinas virtuales y redes bajo demanda?',
    options: [
      'SaaS — Software como Servicio',
      'IaaS — Infraestructura como Servicio',
      'PaaS — Plataforma como Servicio',
      'FaaS — Funciones como Servicio',
    ],
    answer: 1,
    explanation:
      'IaaS proporciona infraestructura (VMs, redes, almacenamiento) bajo demanda, dando el mayor control al usuario sobre el sistema operativo y la configuración.',
  },
  {
    id: 'az900-2',
    cert: 'az-900',
    domain: 'Seguridad y cumplimiento',
    question: '¿Qué herramienta de Azure centraliza la gestión de identidades y accesos?',
    options: ['Azure Monitor', 'Azure Key Vault', 'Microsoft Entra ID (Azure AD)', 'Azure Policy'],
    answer: 2,
    explanation:
      'Microsoft Entra ID (antes Azure AD) es el servicio de gestión de identidades y accesos. Key Vault guarda secretos y claves, no identidades de usuario.',
  },
  {
    id: 'az900-3',
    cert: 'az-900',
    domain: 'Conceptos de nube',
    question: '¿Qué beneficio de la nube describe pagar solo por los recursos que usas?',
    options: ['Alta disponibilidad', 'Elasticidad', 'Modelo de pago por uso', 'Tolerancia a fallos'],
    answer: 2,
    explanation:
      'El modelo de pago por uso (pay-as-you-go) significa que solo pagas por los recursos consumidos, sin inversión inicial en hardware.',
  },
  {
    id: 'az900-4',
    cert: 'az-900',
    domain: 'Servicios principales de Azure',
    question: '¿Qué servicio de Azure es un almacén de objetos para datos no estructurados?',
    options: ['Azure SQL Database', 'Azure Blob Storage', 'Azure Files', 'Azure Cosmos DB'],
    answer: 1,
    explanation:
      'Azure Blob Storage está optimizado para almacenar grandes cantidades de datos no estructurados como imágenes, videos y backups.',
  },
  {
    id: 'az900-5',
    cert: 'az-900',
    domain: 'Precios y soporte (SLA)',
    question: '¿Qué herramienta estima los costos antes de desplegar recursos en Azure?',
    options: ['Azure Advisor', 'Azure Pricing Calculator', 'Azure Cost Management', 'Azure Monitor'],
    answer: 1,
    explanation:
      'La Azure Pricing Calculator permite estimar costos de servicios antes de crearlos. Cost Management analiza el gasto ya generado.',
  },
];

export function questionsForCert(certId: string): Question[] {
  return QUESTIONS.filter((q) => q.cert === certId);
}

export function getCert(certId: string): Cert | undefined {
  return CERTS.find((c) => c.id === certId);
}
