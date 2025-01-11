export const getStore = async (namespace: string) => {
  if (process.env.APP_ENV === 'development') {
    const { getStore } = await import('./local');
    return getStore(namespace);
  } else {
    if (process.env.DEPLOYMENT === 'netlify') {
      const { getStore } = await import('./netlify');
      return getStore(namespace);
    } else if (process.env.DEPLOYMENT === 'vercel') {
      throw new Error('Vercel deployment not supported yet');
    } else {
      throw new Error('Unknown deployment environment');
    }
  }
};
