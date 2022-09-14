import Vue from 'vue';
import moment from 'dayjs';
import clickout from '@/utils/clickout';
import tooltip from '@/utils/tooltip';
import eventBus from './event-bus';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import components from './components';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/chart/sankey';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markArea';
import VModal from 'vue-js-modal';
import { queryOAPTimeInfo } from './utils/localtime';
import './assets';

Vue.use(eventBus);
Vue.use(components);
Vue.use(VModal, { dialog: true });
Vue.directive('clickout', clickout);
Vue.directive('tooltip', tooltip);

Vue.filter('dateformat', (dataStr: any, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(dataStr).format(pattern));

if (!window.Promise) {
  window.Promise = Promise;
}

Vue.config.productionTip = false;

queryOAPTimeInfo().then(() => {
  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
