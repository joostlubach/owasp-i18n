import { Config, defaultConfig } from './config'
import optionalTests from './tests/optional'
import requiredTests from './tests/required'
import { Test, TestDescription, TestResult } from './types'

export default class OWASP {

  constructor(
    config: Partial<Config> = {},
  ) {
    this.config = {...defaultConfig, ...config}
  }

  public config: Config
  public requiredTests = requiredTests()
  public optionalTests = optionalTests()

  public test(password: string): TestResult {
    const result = TestResult.strong({})

    for (const test of this.requiredTests) {
      if (!test.fn(password, this.config)) {
        result.strength = 'bad'
        result.failedTests.push(this.testDescription(test))
        result.failedRequiredTests.push(this.testDescription(test))
      }
    }

    if (this.isPassphrase(password)) {
      result.isPassphrase = true
      return result
    }

    for (const test of this.optionalTests) {
      if (!test.fn(password, this.config)) {
        if (result.strength === 'strong') {
          result.strength = 'weak'
        }
        result.failedTests.push(this.testDescription(test))
        result.failedOptionalTests.push(this.testDescription(test))
      }
    }

    return result
  }

  public isPassphrase(password: string) {
    if (!this.config.allowPassphrase) { return false }
    return password.length >= this.config.minLengthForPassphrase
  }

  private testDescription(test: Test): TestDescription {
    return {
      name:        test.name,
      i18nContext: test.i18nContext?.(this.config) ?? {},
    }
  }

}
