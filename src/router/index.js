import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../components/auth/Login';
import Others from '../components/dashboard/Others';
// import GPS from '../components/dashboard/GPS';
// import Camera from '../components/dashboard/Camera';
// import QRcode from '../components/dashboard/QRcode';

//lazy Loading
const Home = resolve => {
  require.ensure(['../components/dashboard/Home'], ()=> {
    resolve(require('../components/dashboard/Home'));
  });
};

const Register = resolve => {
  require.ensure(['../components/auth/Register'], () => {
    resolve(require('../components/auth/Register'));
  });
};
//AMD 風格寫法
//https://zhenyong.github.io/vue-router/advanced/lazy-loading.html
const QRcode = resolve => require(['../components/dashboard/QRcode.vue'], resolve)
const Camera = resolve => require(['../components/dashboard/Camera.vue'], resolve)
const GPS = resolve => require(['../components/dashboard/GPS.vue'], resolve)
// const Others = resolve => {
//   require.ensure(['../components/dashboard/Others'],()=> {
//     resolve(require('../components/dashboard/Others'));
//   });
// };

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/others',
      component: Others,
      name:'others',
      meta: {
        title: 'Others',
      },
    },
    {
      path: '/home',
      component: Home,
      name:'home',
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/register',
      component: Register,
      name:'register',
      meta: {
        title: 'Register',
      },
    },
    {
      path: '/login',
      component: Login,
      name:'login',
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/gps',
      component: GPS,
      name:'gps',
      meta: {
        title: 'GPS',
      },
    },
    {
      path: '/camera',
      component: Camera,
      name:'camera',
      meta: {
        title: 'Camera',
      },
    },
    {
      path: '/qrcode',
      component: QRcode,
      name:'qrcode',
      meta: {
        title: 'QRcode',
      },
    },
    
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/login');

module.exports = router;
