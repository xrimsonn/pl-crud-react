import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const firebaseKeys = [
  "SOME_KEY_IN_YOUR_ENV_FILE",
  "SOME_OTHER_KEY_IN_YOUR_ENV_FILE",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  firebaseKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  }
})