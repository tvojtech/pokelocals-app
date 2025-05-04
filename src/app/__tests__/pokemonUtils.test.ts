import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Division } from '@/actions/tournament';

import { getPlayerDivision } from '../pokemonUtils';

vi.mock('server-only', () => {
  return {
    // mock server-only module
  };
});

vi.mock('postgres', () => {
  return { default: () => {} };
});

describe('getPlayerDivision', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('2025/04', () => {
    const date = new Date(2025, 4);
    vi.setSystemTime(date);

    expect(getPlayerDivision(2013)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2012)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2008)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002)).toBe(Division.MASTERS);
  });

  it('2025/06', () => {
    const date = new Date(2025, 6);
    vi.setSystemTime(date);

    expect(getPlayerDivision(2014)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2012)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2008)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002)).toBe(Division.MASTERS);
  });

  it('2025/07', () => {
    const date = new Date(2025, 7);
    vi.setSystemTime(date);

    expect(getPlayerDivision(2015)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2014)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2012)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2008)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002)).toBe(Division.MASTERS);
  });

  it('2026/02', () => {
    const date = new Date(2026, 2);
    vi.setSystemTime(date);

    expect(getPlayerDivision(2015)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2014)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2012)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2008)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002)).toBe(Division.MASTERS);
  });
});
