export interface Config {
  minLength: number
  maxLength: number

  allowPassphrase: boolean

  minLengthForPassphrase: number
  minOptionalTestsForStrong: number
}

export const defaultConfig: Config = {
  minLength: 8,
  maxLength: 128,

  allowPassphrase: true,

  minLengthForPassphrase: 16,
  minOptionalTestsForStrong: 4,
}

export function configureDefaults(config: Partial<Config>) {
  Object.assign(defaultConfig, config)
}