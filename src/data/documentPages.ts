export interface DocumentManifest {
  pdfPath: string;
  title: string;
  pages: string[];
}

export const DOCUMENT_PAGES_MAP: Record<string, DocumentManifest> = {
  '/assets/aistudio/ceilia_f5c95ee4.pdf': {
    pdfPath: '/assets/aistudio/ceilia_f5c95ee4.pdf',
    title: 'Laudo Carlos Chagas (Dra. Cecília) - 9 Páginas',
    pages: [
      '/assets/rendered/ceilia_01.png', // Pág 1: EAS / Urina
      '/assets/rendered/ceilia_02.png', // Pág 2: Anti-HCV
      '/assets/rendered/ceilia_03.png', // Pág 3: Hemograma Completo
      '/assets/rendered/ceilia_04.png', // Pág 4: Colesterol Total, HDL, VLDL
      '/assets/rendered/ceilia_05.png', // Pág 5: LDL, TGP/ALT, TGO/AST
      '/assets/rendered/ceilia_06.png', // Pág 6: Bilirrubinas, Albumina
      '/assets/rendered/ceilia_07.png', // Pág 7: Creatinina, Ureia, Sódio, Potássio
      '/assets/rendered/ceilia_08.png', // Pág 8: Cálcio, Magnésio
      '/assets/rendered/ceilia_09.png', // Pág 9: VDRL Sífilis
    ],
  },
  '/assets/aistudio/Tulio_a8028bee.pdf': {
    pdfPath: '/assets/aistudio/Tulio_a8028bee.pdf',
    title: 'Laudo Carlos Chagas (Dr. Túlio) - 8 Páginas',
    pages: [
      '/assets/rendered/tulio_01.png', // Pág 1: Anti-HBc Total
      '/assets/rendered/tulio_02.png', // Pág 2: HBsAg
      '/assets/rendered/tulio_03.png', // Pág 3: Toxoplasmose IgG
      '/assets/rendered/tulio_04.png', // Pág 4: Toxoplasmose IgM
      '/assets/rendered/tulio_05.png', // Pág 5: HbA1c & Glicemia Média
      '/assets/rendered/tulio_06.png', // Pág 6: Anti-HBs e Anti-HCV
      '/assets/rendered/tulio_07.png', // Pág 7: Testosterona Total e Livre
      '/assets/rendered/tulio_08.png', // Pág 8: VDRL Sífilis
    ],
  },
  '/assets/aistudio/etraiol_d7833244.pdf': {
    pdfPath: '/assets/aistudio/etraiol_d7833244.pdf',
    title: 'Laudo Hospital Geral de Juiz de Fora (HGeJF) - 9 Páginas',
    pages: [
      '/assets/rendered/hgejf_01.png', // Pág 1: Hemograma
      '/assets/rendered/hgejf_02.png', // Pág 2: Glicose
      '/assets/rendered/hgejf_03.png', // Pág 3: HbA1c, Ureia, Creatinina
      '/assets/rendered/hgejf_04.png', // Pág 4: Ácido Úrico
      '/assets/rendered/hgejf_05.png', // Pág 5: Perfil Lipídico
      '/assets/rendered/hgejf_06.png', // Pág 6: Lipídico faixa etária
      '/assets/rendered/hgejf_07.png', // Pág 7: Bilirrubinas, TGO, TGP, Fosfatase Alcalina
      '/assets/rendered/hgejf_08.png', // Pág 8: GGT, Estradiol, LH, FSH, Prolactina
      '/assets/rendered/hgejf_09.png', // Pág 9: PSA Total e Livre
    ],
  },
  '/assets/aistudio/laudoSangue_6f5bc10f.pdf': {
    pdfPath: '/assets/aistudio/laudoSangue_6f5bc10f.pdf',
    title: 'Laudo Santa Casa (Admissão 20/09) - 7 Páginas',
    pages: [
      '/assets/rendered/santacasa_adm_01.png', // Hemograma
      '/assets/rendered/santacasa_adm_02.png', // Ureia, Creatinina
      '/assets/rendered/santacasa_adm_03.png', // Sódio, Potássio, Magnésio, PCR
      '/assets/rendered/santacasa_adm_04.png', // Coagulograma (TAP, TTPA)
      '/assets/rendered/santacasa_adm_05.png', // Notas técnicas
      '/assets/rendered/santacasa_adm_06.png',
      '/assets/rendered/santacasa_adm_07.png',
    ],
  },
  '/assets/aistudio/laudoHemograma_dcadf96f.pdf': {
    pdfPath: '/assets/aistudio/laudoHemograma_dcadf96f.pdf',
    title: 'Laudo Santa Casa (Controle 24/09) - 5 Páginas',
    pages: [
      '/assets/rendered/santacasa_ctrl_01.png', // Hemograma
      '/assets/rendered/santacasa_ctrl_02.png', // Glicemia, Ureia, Creatinina
      '/assets/rendered/santacasa_ctrl_03.png', // Sódio, Potássio
      '/assets/rendered/santacasa_ctrl_04.png', // HbA1c
      '/assets/rendered/santacasa_ctrl_05.png', // Coagulograma
    ],
  },
  '/assets/aistudio/Capa_Dossie_Clinico_Cirurgico_Vascular_c2d903bf.pdf': {
    pdfPath: '/assets/aistudio/Capa_Dossie_Clinico_Cirurgico_Vascular_c2d903bf.pdf',
    title: 'Capa Oficial do Dossiê Clínico e Cirúrgico Vascular',
    pages: ['/assets/rendered/capa_dossie_01.png'],
  },
  '/assets/aistudio/evoluvao_46453b8c.pdf': {
    pdfPath: '/assets/aistudio/evoluvao_46453b8c.pdf',
    title: 'Relatório Médico de Evolução - Dr. Luiz Kingma',
    pages: [
      '/assets/rendered/evolucao_kingma_01.png',
      '/assets/aistudio/Evolucomedica_8c152df1.jpg',
    ],
  },
  '/assets/aistudio/DOSSI__CL_NICO_E_CIR_RGICO_VASCULAR_e347b32d.pdf': {
    pdfPath: '/assets/aistudio/DOSSI__CL_NICO_E_CIR_RGICO_VASCULAR_e347b32d.pdf',
    title: 'Dossiê Clínico e Cirúrgico Vascular (Texto Completo)',
    pages: [
      '/assets/rendered/dossie_vascular_01.png',
      '/assets/rendered/dossie_vascular_02.png',
    ],
  },
  '/assets/aistudio/Procedimento_de_Alta_Complexidade_78074c58.pdf': {
    pdfPath: '/assets/aistudio/Procedimento_de_Alta_Complexidade_78074c58.pdf',
    title: 'Mensagem Oficial Marinha SIGAD-MB - Procedimento Alta Complexidade',
    pages: ['/assets/rendered/procedimento_alta_complexidade_01.png'],
  },
  '/assets/aistudio/EmailSgAna_354ae570.pdf': {
    pdfPath: '/assets/aistudio/EmailSgAna_354ae570.pdf',
    title: 'E-mail 3º Sgt Ana Barbazan (Regulação Marinha)',
    pages: ['/assets/rendered/email_marinha_01.png'],
  },
  '/assets/aistudio/Sumario_Exames_Laboratoriais_c974fc21.pdf': {
    pdfPath: '/assets/aistudio/Sumario_Exames_Laboratoriais_c974fc21.pdf',
    title: 'Índice e Sumário Geral dos Exames Laboratoriais',
    pages: ['/assets/rendered/sumario_lab_01.png'],
  },
  '/assets/aistudio/Folhas_de_Rosto_Divisorias_Blocos_2207e92b.pdf': {
    pdfPath: '/assets/aistudio/Folhas_de_Rosto_Divisorias_Blocos_2207e92b.pdf',
    title: 'Folhas de Rosto / Divisórias A4 dos Blocos da Pasta',
    pages: [
      '/assets/rendered/divisorias_01.png',
      '/assets/rendered/divisorias_02.png',
      '/assets/rendered/divisorias_03.png',
    ],
  },
  '/assets/aistudio/Etiquetas_Organizadoras_Dossie_3d35db1a.pdf': {
    pdfPath: '/assets/aistudio/Etiquetas_Organizadoras_Dossie_3d35db1a.pdf',
    title: 'Folha de Etiquetas Organizadoras de Exames (Itens 01 a 18)',
    pages: ['/assets/rendered/etiquetas_01.png'],
  },
};
