import { LabPortalCredential } from '../types/medical';

export const LAB_PORTALS_CREDENTIALS: LabPortalCredential[] = [
  {
    id: 'carlos-chagas',
    name: 'Laboratório Carlos Chagas (CT - Catedral / Juiz de Fora)',
    shortName: 'Lab. Carlos Chagas',
    url: 'https://www.laboratoriocarloschagas.com.br',
    category: 'laboratorio',
    loginLabel: 'CPF do Paciente / O.S.',
    loginValue: '862.278.156-91',
    passwordLabel: 'Chave de Acesso / O.S.',
    passwordValue: '004-67872-36',
    protocolLabel: 'Ordem de Serviço',
    protocolValue: '004-67872-36',
    additionalInfo: 'Laboratório responsável pela rotina pré-operatória oficial (Dra. Cecília e Dr. Túlio) e controle virológico.',
    phones: [
      { label: 'Central de Atendimento', number: '(32) 3215-1262' },
      { label: 'Unidade Catedral', number: '(32) 3215-1262' }
    ],
    availableExams: [
      'Carga Viral HIV e Contagem CD4 / CD8',
      'Hemograma Completo e Coagulograma (TAP/INR, TTPA)',
      'Bioquímica Renal (Ureia 29,2 mg/dL, Creatinina 1,10 mg/dL, TFG 79,2 mL/min)',
      'Eletrólitos Completos (Sódio 136, Potássio 3,9, Cálcio 9,5, Magnésio 1,7)',
      'Perfil Hepático (TGO 19 U/L, TGP 22 U/L, Bilirrubinas, Albumina 3,9 g/dL)',
      'Perfil Lipídico (Colesterol Total 221, HDL 68, LDL 133, Triglicérides)',
      'Sorologias Pré-Operatórias (Anti-HCV, VDRL, HBsAg, Anti-HBc, Toxoplasmose)',
      'Painel Hormonal (Testosterona Total 425 ng/dL, Testosterona Livre 6,2 ng/dL)',
      'Urina Tipo 1 / EAS (Límpido, sem infecção)'
    ],
    pendingExam: {
      examName: 'Carga Viral HIV (Controle Imediato Pré-Internação HNMD)',
      protocol: 'P168579',
      password: 'm4-QQywm',
      instructions: 'Acesse o site www.laboratoriocarloschagas.com.br, clique em "Resultados Online", informe o Protocolo P168579 e a Senha m4-QQywm para emitir o laudo assim que liberado.',
      status: 'aguardando'
    }
  },
  {
    id: 'santa-casa-jf',
    name: 'Santa Casa de Misericórdia de Juiz de Fora (MVPEP & CINDI)',
    shortName: 'Santa Casa de Juiz de Fora',
    url: 'http://www.santacasajf.org.br',
    category: 'hospital',
    loginLabel: 'Usuário / Nº Prontuário',
    loginValue: '91226818',
    passwordLabel: 'Senha de Acesso',
    passwordValue: '60613938',
    protocolLabel: 'Nº Atendimento',
    protocolValue: '4945339',
    additionalInfo: 'Portal com prontuário eletrônico MVPEP da internação hospitalar (20/09 a 10/10/2026), hemodinâmica e laudos vasculares.',
    phones: [
      { label: 'CINDI (Ultrassonografia e Doppler)', number: '(32) 3229-2007' },
      { label: 'Hemodinâmica (Cateterismo CATE)', number: '(32) 3229-2220' },
      { label: 'Radiologia e Tomografia', number: '(32) 3229-2390' },
      { label: 'Central Geral Santa Casa', number: '(32) 3229-2000' }
    ],
    availableExams: [
      'Cateterismo Cardíaco (CATE 88181 - 01/10/2026) - Coronárias Livres de Obstruções',
      'Relatório de Evolução de Cirurgia Vascular (Dr. Luiz Kingma Lanziotti - CRM 11024)',
      'Resumo de Alta Hospitalar (Internação de 20/09/2026 a 10/10/2026)',
      'Eco Color Doppler de Carótidas e Vertebrais (CINDI - 24/09/2026 - Normal)',
      'Eco Color Doppler Arterial Membro Inferior Direito (CINDI - 21/09/2026)',
      'Exames Laboratoriais de Admissão Hospitalar (20/09/2026) e Controle (29/09/2026)'
    ]
  },
  {
    id: 'ultrimagem',
    name: 'Ultrimagem Diagnósticos por Imagem (Juiz de Fora)',
    shortName: 'Ultrimagem Diagnósticos',
    url: 'https://www.ultrimagem.com.br',
    category: 'imagem',
    loginLabel: 'Nº de Ordem',
    loginValue: '471034',
    passwordLabel: 'Senha de Acesso',
    passwordValue: '8471034',
    protocolLabel: 'Protocolos / Chaves',
    protocolValue: '1001 1636589 / 1001 1636599',
    additionalInfo: 'Exames de Angiotomografia Multislice com reconstruções 3D da aorta e vascularização periférica (filmes físicos e CD de imagens disponíveis com o paciente).',
    phones: [
      { label: 'Central Telefônica', number: '(32) 3257-8000' },
      { label: 'WhatsApp Agendamento/Laudos', number: '(32) 98845-6363' }
    ],
    availableExams: [
      'Angiotomografia da Aorta Abdominal e Membros Inferiores (Ateromatose Aortoilíaca Severa)',
      'Angiotomografia Arterial Torácica Multislice (Ord. 471034)',
      'Imagens DICOM e reconstruções 3D para planejamento vascular'
    ]
  },
  {
    id: 'hgejf-exercito',
    name: 'Hospital Geral de Juiz de Fora (HGeJF - Exército Brasileiro)',
    shortName: 'HGeJF (Exército)',
    url: 'https://www.laudoonline.com.br/hgejf',
    category: 'hospital',
    loginLabel: 'Login / Prontuário',
    loginValue: '00104618',
    passwordLabel: 'Senha de Acesso',
    passwordValue: '18538237',
    protocolLabel: 'Matrícula SAMMED/FUSEx',
    protocolValue: '00104618',
    additionalInfo: 'Histórico ambulatorial e laboratorial do Hospital do Exército (Doutores Túlio Mendes e Arthur Valdier).',
    phones: [
      { label: 'PABX Hospital Geral', number: '(32) 3229-6100' },
      { label: 'Laboratório de Análises Clínicas (LAC)', number: '(32) 3229-6138' }
    ],
    availableExams: [
      'Histórico Bioquímico e Hormonal Completo (Dr. Arthur Valdier - 9 Páginas)',
      'Controle Glicêmico Histórico (Glicemia de Jejum 97 mg/dL, HbA1c 5,2%)',
      'Função Renal Histórica (Ureia 24 mg/dL, Creatinina 1,18 mg/dL)',
      'Marcadores Prostáticos (PSA Total 0,61 ng/dL - Baixo Risco)',
      'Painel de Estradiol (E2: 86,3 pg/mL) e Ácido Úrico (5,7 mg/dL)'
    ]
  }
];
