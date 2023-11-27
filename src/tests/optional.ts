import { Test } from '../types'

export default function optionalTests(): Test[] {
  return [{
    name: 'one_lowercase',
    fn:   password => /[a-z]/.test(password),
  }, {
    name: 'one_uppercase',
    fn:   password => /[A-Z]/.test(password),
  }, {
    name: 'one_number',
    fn:   password => /[0-9]/.test(password),
  }, {
    name: 'one_special',
    fn:   password => /[^a-z0-9]/i.test(password),
  }]
}
