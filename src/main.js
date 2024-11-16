import './assets/base.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
});

app.mount('#app');
