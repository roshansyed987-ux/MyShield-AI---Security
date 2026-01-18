
export enum SecurityView {
  DASHBOARD = 'DASHBOARD',
  APP_SCANNER = 'APP_SCANNER',
  HIJACK_CHECK = 'HIJACK_CHECK',
  CONTROL_AUDIT = 'CONTROL_AUDIT',
  SYSTEM_DEBLOATER = 'SYSTEM_DEBLOATER',
  PRIVACY_SNIFFER = 'PRIVACY_SNIFFER'
}

export interface SecurityIssue {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  category: 'Privacy' | 'Malware' | 'Hijacking' | 'Control';
}

export interface PrivacyLeak {
  id: string;
  app: string;
  type: 'Telemetry' | 'Tracker' | 'Hidden Listener' | 'Data Leak';
  impact: 'High' | 'Medium' | 'Low';
  detectedAt: string;
}

export interface AppMetadata {
  name: string;
  packageName: string;
  permissions: string[];
  isSystem: boolean;
  installSource: string;
}

export interface ScanResult {
  score: number;
  threatsFound: number;
  details: string;
  timestamp: string;
}
