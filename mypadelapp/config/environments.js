const environments = {
  dv: {
    name: 'development',
    apiUrl: 'https://api-dev.padelapp.com',
    appName: 'Padel App (Dev)',
    bundleId: 'com.padelapp.dev',
    debugMode: true,
    logLevel: 'debug'
  },
  pp: {
    name: 'preproduction', 
    apiUrl: 'https://api-staging.padelapp.com',
    appName: 'Padel App (PreProd)',
    bundleId: 'com.padelapp.staging',
    debugMode: false,
    logLevel: 'warn'
  },
  pd: {
    name: 'production',
    apiUrl: 'https://api.padelapp.com', 
    appName: 'Padel App',
    bundleId: 'com.padelapp.prod',
    debugMode: false,
    logLevel: 'error'
  }
};

const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV || 'dv';
  return environments[env] || environments.dv;
};

export { environments, getCurrentEnvironment };
export default getCurrentEnvironment();