import { describe, expect, it, vi } from 'vitest';

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
  it('2025/05', () => {
    const date = new Date(2025, 4);

    expect(getPlayerDivision(2013, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2012, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2008, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002, date)).toBe(Division.MASTERS);
  });

  it('2025/06', () => {
    const date = new Date(2025, 5);

    expect(getPlayerDivision(2013, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2012, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2008, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002, date)).toBe(Division.MASTERS);
  });

  it('2025/07', () => {
    const date = new Date(2025, 6);

    expect(getPlayerDivision(2015, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2014, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2012, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2008, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002, date)).toBe(Division.MASTERS);
  });

  it('2025/08', () => {
    const date = new Date(2025, 7);

    expect(getPlayerDivision(2015, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2014, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2012, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2008, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002, date)).toBe(Division.MASTERS);
  });

  it('2026/02', () => {
    const date = new Date(2026, 2);

    expect(getPlayerDivision(2015, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2014, date)).toBe(Division.JUNIORS);
    expect(getPlayerDivision(2013, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2012, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2011, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2010, date)).toBe(Division.SENIORS);
    expect(getPlayerDivision(2009, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2008, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2007, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2006, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2005, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2004, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2003, date)).toBe(Division.MASTERS);
    expect(getPlayerDivision(2002, date)).toBe(Division.MASTERS);
  });
});
