import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.natyatheerth.app',
  appName: 'Natya Theerth',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#1A0A0A',
      showSpinner: false
    }
  }
};

export default config;
