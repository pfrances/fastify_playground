import { toTest } from '@src/index';

describe('Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});

describe('toTest', () => {
  it('should return "test"', () => {
    expect(toTest()).toBe('test');
  });
});
