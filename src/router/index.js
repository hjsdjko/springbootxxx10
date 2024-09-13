	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import address from '@/views/address/list'
	import maijia from '@/views/maijia/list'
	import discussershoushangpin from '@/views/discussershoushangpin/list'
	import storeup from '@/views/storeup/list'
	import users from '@/views/users/list'
	import yonghu from '@/views/yonghu/list'
	import shangpinfenlei from '@/views/shangpinfenlei/list'
	import messages from '@/views/messages/list'
	import ershoushangpin from '@/views/ershoushangpin/list'
	import orders from '@/views/orders/list'
	import zaixianzixun from '@/views/zaixianzixun/list'
	import config from '@/views/config/list'
	import maijiaRegister from '@/views/maijia/register'
	import maijiaCenter from '@/views/maijia/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/maijiaCenter',
			name: '卖家个人中心',
			component: maijiaCenter
		}
		,{
			path: '/news',
			name: '校园资讯',
			component: news
		}
		,{
			path: '/address',
			name: '地址',
			component: address
		}
		,{
			path: '/maijia',
			name: '卖家',
			component: maijia
		}
		,{
			path: '/discussershoushangpin',
			name: '二手商品评论',
			component: discussershoushangpin
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/shangpinfenlei',
			name: '商品分类',
			component: shangpinfenlei
		}
		,{
			path: '/messages',
			name: '留言板',
			component: messages
		}
		,{
			path: '/ershoushangpin',
			name: '二手商品',
			component: ershoushangpin
		}
		,{
			path: '/orders',
			name: '订单管理',
			component: orders
		}
		,{
			path: '/zaixianzixun',
			name: '在线咨询',
			component: zaixianzixun
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		]
	},
	{
		path: '/maijiaRegister',
		name: '卖家注册',
		component: maijiaRegister
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
