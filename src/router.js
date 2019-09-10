import Vue from 'vue'
import Router from 'vue-router'
import Logo from "@/views/logo"
import Home from "@/views/home"
import Vacation from "@/views/vacation"
import Overtime from "@/views/overtime"
Vue.use(Router)

let router=new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Logo
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/vacation',
      name: 'vacation',
      component: Vacation
    },
    {
      path: '/overtime',
      name: 'overtime',
      component: Overtime
    },
    {
      path:"*",
      redirect:"/home"
    }
  ]
})
router.beforeEach((to,from,next) => {
  var token = localStorage.getItem('token');
  if (token)
  {
    if (to.path == '/login')
    {
      next(from.path);
    }
    else
    {
      next(); 
    }
  }
  else
  {
    if (to.path == '/login')
    {
      next();
    }
    else
    {
      next('/login');
    }
  }


})

export default router;