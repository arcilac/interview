import { urlUtils } from '../url'
import { REGIONS } from '../../schema/countriesSchema'

describe('urlUtils', () => {
  describe('updateSearchParams', () => {
    it('sets new params and updates existing ones', () => {
      const params = new URLSearchParams('foo=bar&baz=qux')
      urlUtils.updateSearchParams(params, { foo: 'new', hello: 'world' })
      expect(params.get('foo')).toBe('new')
      expect(params.get('hello')).toBe('world')
      expect(params.get('baz')).toBe('qux')
    })

    it('removes params with null or empty values', () => {
      const params = new URLSearchParams('foo=bar&baz=qux')
      urlUtils.updateSearchParams(params, { foo: null, baz: '' })
      expect(params.has('foo')).toBe(false)
      expect(params.has('baz')).toBe(false)
    })
  })

  describe('buildUrl', () => {
    it('returns baseUrl if params are empty', () => {
      const params = new URLSearchParams()
      expect(urlUtils.buildUrl('/base', params)).toBe('/base')
    })
    it('appends params to baseUrl', () => {
      const params = new URLSearchParams('foo=bar&baz=qux')
      expect(urlUtils.buildUrl('/base', params)).toBe('/base?foo=bar&baz=qux')
    })
  })

  describe('isValidRegion', () => {
    it('returns true for valid regions', () => {
      for (const region of REGIONS) {
        expect(urlUtils.isValidRegion(region)).toBe(true)
      }
    })
    it('returns false for invalid or null regions', () => {
      expect(urlUtils.isValidRegion('NotARegion')).toBe(false)
      expect(urlUtils.isValidRegion(null)).toBe(false)
      expect(urlUtils.isValidRegion('')).toBe(false)
    })
  })
})
