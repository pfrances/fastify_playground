import { sum } from './pg';

describe('playground', () => {
  it('add 1 + 2 = 3 ', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('truthy or falsy', () => {
  it('true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('false is falsy', () => {
    expect(false).toBeFalsy();
  });

  it('0 is falsy', () => {
    expect(0).toBeFalsy();
    expect(0).not.toBeTruthy();
  });
});

describe('numbers', () => {
  it('2 + 2 = 4', () => {
    const value = 2 + 2;
    expect(value).toBe(4);
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4);
  });

  it('add floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.3);
  });
});

describe('strings', () => {
  it('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });

  it('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
});

describe('arrays', () => {
  const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

  it('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
  });

  it('the shopping list does not have beer on it', () => {
    expect(shoppingList).not.toContain('beer');
  });
});

describe('exceptions', () => {
  function compileAndroidCode(): never {
    throw new Error('you are using the wrong JDK');
  }

  it('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(Error);
    expect(compileAndroidCode).toThrow(/JDK/);
  });
});

describe('async', () => {
  it('the data is peanut butter', async () => {
    const data = await Promise.resolve('peanut butter');
    expect(data).toBe('peanut butter');
  });

  it('the fetch fails with an error', async () => {
    try {
      await Promise.reject(new Error('error'));
    } catch (e) {
      expect(e).toMatchObject({ message: 'error' });
    }
  });

  it('the data is peanut butter', async () => {
    await expect(Promise.resolve('peanut butter')).resolves.toBe('peanut butter');
  });
});

let cities: string[] = [];
describe('beforeEach', () => {
  beforeAll(() => {
    cities.push('Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen');
  });

  beforeEach(() => {
    cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'];
  });

  afterEach(() => {
    cities = [];
  });

  it('cities has 4 items', () => {
    expect(cities).toHaveLength(4);
  });

  it('cities has Beijing', () => {
    expect(cities).toContain('Beijing');
  });

  it('shoudl add a city', () => {
    cities.push('Hangzhou');
    expect(cities).toHaveLength(5);
  });

  it('should remove a city', () => {
    cities.pop();
    expect(cities).toHaveLength(3);
  });
});

// describe('only', () => {
//   it.only('should only run this test', () => {
//     expect(true).toBeTruthy();
//   });

//   it('should not run this test', () => {
//     expect(false).toBeFalsy();
//   });
// });

describe('skip', () => {
  it.skip('should skip this test', () => {
    expect(true).toBeTruthy();
  });

  it('should run this test', () => {
    expect(true).toBeTruthy();
  });
});

const callbackFunc = (data: string, callback: (data: string) => string): string => {
  const res = callback(data);
  return res;
};

describe('mock', () => {
  it('should mock a function', () => {
    const mockFn = jest.fn();
    mockFn('a', 'b');
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith('a', 'b');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveReturnedTimes(1);
    expect(mockFn).toHaveReturnedWith(undefined);
  });

  it('should mock callbackFunc', () => {
    const mockCallback = jest.fn((data: string) => data);
    const res = callbackFunc('data', mockCallback);
    expect(mockCallback).toHaveBeenCalledWith('data');
    expect(mockCallback).toHaveReturnedWith('data');
    expect(mockCallback).toHaveBeenLastCalledWith('data');
    expect(res).toBe('data');
  });

  it('should mock return value', () => {
    const mockFn = jest.fn().mockReturnValue('default');
    expect(mockFn()).toBe('default');
  });

  it('should mock promise', async () => {
    const mockPromise = jest.fn().mockResolvedValue('resolved');
    const res = await mockPromise();
    expect(res).toBe('resolved');
  });

  it('should mock promise reject', async () => {
    const mockPromise = jest.fn().mockRejectedValue('rejected');
    try {
      await mockPromise();
    } catch (e) {
      expect(e).toBe('rejected');
    }
  });

  it('should mock promise resolve', async () => {
    const mockPromise = jest.fn().mockReturnValueOnce('a').mockReturnValueOnce('b').mockReturnValue('c');
    expect(mockPromise()).toBe('a');
    expect(mockPromise()).toBe('b');
    expect(mockPromise()).toBe('c');
  });
});

describe('spy', () => {
  it('should spy on console.log with mock', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    console.log('hello');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('hello');
  });
});
