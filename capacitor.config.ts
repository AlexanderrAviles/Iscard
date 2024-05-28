import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.polodev.iscard',
  appName: 'iscard',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
