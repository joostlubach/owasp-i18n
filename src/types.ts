import {Config} from './config'

export interface Test {
  name:         string
  fn:           (password: string, config: Config) => boolean
  i18nContext?: (config: Config) => Record<string, string>
}

export interface TestResult {
  strength: PasswordStrength

  failedTests:         TestDescription[]
  failedRequiredTests: TestDescription[]
  failedOptionalTests: TestDescription[]

  isPassphrase: boolean
}

export interface TestDescription {
  name:        string
  i18nContext: Record<string, string>
}

interface TestResultStatic {
  create: (strength: PasswordStrength, overrides?: Partial<TestResult>) => TestResult
  bad:    (overrides: Partial<TestResult>) => TestResult
  weak:   (overrides: Partial<TestResult>) => TestResult
  strong: (overrides?: Partial<TestResult>) => TestResult
}

export const TestResult: TestResultStatic = {

  create: (strength, overrides) => ({
    strength,
    failedTests:         [],
    failedRequiredTests: [],
    failedOptionalTests: [],
    isPassphrase:        false,
    ...overrides,
  }),

  bad:   overrides => TestResult.create('bad', overrides),
  weak:  overrides => TestResult.create('weak', overrides),
  strong: overrides => TestResult.create('strong', overrides),
}

type PasswordStrength = 'bad' | 'weak' | 'strong'