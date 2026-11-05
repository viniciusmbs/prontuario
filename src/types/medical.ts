export interface PatientInfo {
  name: string;
  nip: string;
  cpf: string;
  rg: string;
  birthDate: string;
  age: number;
  insurance: string;
  destinationHospital: string;
  appointmentDate: string;
  specialty: string;
  mainDiagnosis: string;
  cid: string;
  habits: string;
  comorbidities: string[];
  allergies: string;
  infectologyStatus: {
    hivTime: string;
    cd4: string;
    cd4Percent: string;
    viralLoad: string;
    viralLoadDate: string;
    status: string;
    doctor: string;
    crm: string;
  };
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
}

export interface Medication {
  id: string;
  category: 'analgesia' | 'vascular' | 'hiv';
  categoryLabel: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  notes?: string;
}

export type ResultStatus = 'normal' | 'altered' | 'attention' | 'pending';

export interface LabParameter {
  id: string;
  name: string;
  synonyms?: string[];
  category: 'hematologia' | 'bioquimica' | 'coagulacao' | 'urina' | 'sorologia' | 'hormonal' | 'imunologia' | 'gasometria';
  categoryLabel: string;
  value: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: ResultStatus;
  statusLabel?: string;
  date: string;
  laboratory: string;
  physician: string;
  documentTitle: string;
  documentPath: string;
  folderTab: string; // Ex: "Aba 3: Infectologia e Exames de Sangue"
  blockName?: string; // Ex: "Bloco 2: Dra. Cecília Faria Wolkartt"
  physicalPage: string; // Ex: "Página 7/9"
  itemId?: string; // Ex: "ITEM 12"
  notes?: string;
}

export interface PhysicalFolderItem {
  id: string;
  itemNumber: number; // 1 to 18
  tab: string; // "ABA 1", "ABA 2", "ABA 3", "ABA 4"
  tabTitle: string;
  title: string;
  subtitle: string;
  date?: string;
  institution?: string;
  professional?: string;
  filePath?: string;
  fileType: 'pdf' | 'image' | 'media';
  summary: string;
  statusText?: string;
  tags: string[];
}

export interface HNMDRequirement {
  id: string;
  name: string;
  status: 'present' | 'partial' | 'pending';
  latestDate: string;
  latestValue?: string;
  tabLocation: string;
  pageLocation: string;
  filePath: string;
  doctor: string;
  notes: string;
}

export interface LabPortalCredential {
  id: string;
  name: string;
  shortName: string;
  url: string;
  category: 'laboratorio' | 'hospital' | 'imagem';
  loginLabel: string;
  loginValue: string;
  passwordLabel?: string;
  passwordValue: string;
  protocolLabel?: string;
  protocolValue?: string;
  additionalInfo?: string;
  phones?: { label: string; number: string }[];
  availableExams: string[];
  pendingExam?: {
    examName: string;
    protocol: string;
    password: string;
    instructions: string;
    status: 'aguardando' | 'liberado';
  };
}

