import { twMerge } from '../src'

test('conflicts across modifiers', () => {
    expect(twMerge('hover:block hover:inline')).toBe('hover:inline')
    expect(twMerge('hover:block hover:focus:inline')).toBe('hover:block hover:focus:inline')
    expect(twMerge('hover:block hover:focus:inline focus:hover:inline')).toBe(
        'hover:block focus:hover:inline'
    )
    expect(twMerge('focus-within:inline focus-within:block')).toBe('focus-within:block')
})
