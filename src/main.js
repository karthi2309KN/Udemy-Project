import { createApp } from 'vue';

import router from './router.js';
import store from './stores/index.js';
import App from './App.vue';
import BaseCard from "@/components/ui/BaseCard";
import BaseButton from "@/components/ui/BaseButton";
import BaseBadge from "@/components/ui/BaseBadge";
import BaseSpinner from "@/components/ui/BaseSpinner";
import BaseDialog from "@/components/ui/BaseDialog";

const app = createApp(App)

app.use(router);
app.use(store);
app.component('base-card',BaseCard);
app.component('base-button',BaseButton)
app.component('base_badge',BaseBadge);
app.component('base-spinner',BaseSpinner)
app.component('base-dialog',BaseDialog)
app.mount('#app');
