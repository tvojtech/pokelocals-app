export const getStore = async (namespace: string) => {
  if (process.env.DEPLOYMENT === 'local') {
    const { getStore } = await import('./local');
    return getStore(namespace);
  } else {
    if (process.env.PLATFORM === 'netlify') {
      const { getStore } = await import('./netlify');
      return getStore(process.env.DEPLOYMENT + ':' + namespace);
    } else if (process.env.PLATFORM === 'vercel') {
      throw new Error('Vercel deployment not supported yet');
    } else {
      throw new Error('Unknown deployment environment');
    }
  }
};
