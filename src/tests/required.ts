import { Test } from '../types.js'

export default function requiredTests(): Test[] {
  return [{
    name:        'min_length',
    fn:          (password, config) => password.length >= config.minLength,
    i18nContext: config => ({min_length: config.minLength.toString()}),
  }, {
    name:        'max_length',
    fn:          (password, config) => password.length <= config.maxLength,
    i18nContext: config => ({max_length: config.maxLength.toString()}),
  }, {
    name: 'no_sequences',
    fn:   password => !/(.)\1{2,}/.test(password),
  }]
}
