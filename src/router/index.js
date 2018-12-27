import Vue from 'vue'
import Router from 'vue-router'

// 企业名称测算 
// // import nameCheckTool from '../components/nameCheckTool'
// const nameCheckTool = () => import(/* webpackChunkName: "nameCheck" */ '../components/nameCheckTool')
// // 企业名称核验
// // import nameTestTool from '../components/nameTestTool'
// const nameTestTool = () => import(/* webpackChunkName: "nameTest" */ '../components/nameTestTool')

// // 方案工具
// // import projectTool from '../components/projectTool'
// // import projectReport from '../components/projectTool/report'
// const projectTool = () => import(/* webpackChunkName: "project" */ '../components/projectTool')
// const projectReport = () => import(/* webpackChunkName: "project" */ '../components/projectTool/report')

// 个税计算
// import taxAccount from '../components/taxAccount'
const taxAccount = () => import(/* webpackChunkName: "taxAccount" */ '../components/taxAccount')

// 异常检测
// const abnormalityIndex = () => import(/* webpackChunkName: "abnormality" */ '../components/abnormalityTool')
// const abnormalityLogin = () => import(/* webpackChunkName: "abnormality" */ '../components/abnormalityTool/component/login.vue')
// const abnormalityError = () => import(/* webpackChunkName: "abnormality" */ '../components/abnormalityTool/component/error.vue')
// const abnormalityDetail = () => import(/* webpackChunkName: "abnormality" */ '../components/abnormalityTool/component/detail.vue')

// 发票检测
// const InvoiceIndex = () => import(/* webpackChunkName: "abnormality" */ '../components/invoice/index.vue')
Vue.use(Router)


export default new Router({
    // mode:'history',
    routes: [
        // {
        //     path: "/nametesttool",
        //     name: 'nameTestTool',
        //     component: nameTestTool,
        //     meta: {
        //         title: "企业名称解析",
        //         index: 9999,
        //         //  百度统计校验值
        //         // hmId: "nameTestTool"
        //     }
        // },
        // {
        //     path: "/namechecktool",
        //     name: 'nameCheckTool',
        //     component: nameCheckTool,
        //     meta: {
        //         title: "企业名称测算",
        //         index: 1,
        //         // hmId: "nameCheckTool"
        //     }
        // },
        // {
        //     path: "/project/:id",
        //     name: "projectTool",
        //     component: projectTool,
        //     meta: {
        //         title: "方案工具",
        //         index: 3,
        //         // hmId: "projectTool"
        //     }
        // },
        // {
        //     path: "/report",
        //     name: "projectReport",
        //     component: projectReport,
        //     meta: {
        //         title: "方案工具",
        //         index: 3,
        //         // hmId: "projectTool"
        //     }
        // },
        {
            path: "/taxaccount",
            name: "taxAccount",
            component: taxAccount,
            meta: {
                title: "个税计算",
                index: 2,
                // hmId: "taxAccount"
            }
        },
        // {
        //     path: "/abnormality",
        //     component: abnormalityIndex,
        //     children: [
        //         {
        //             path: "login",
        //             name: "abnormalityLogin",
        //             component: abnormalityLogin,
        //             meta: {
        //                 title: "异常查询",
        //                 index: 9999,
        //                 //  hmId: ""
        //             }
        //         },
        //         {
        //             path: "error",
        //             name: "abnormalityError",
        //             component: abnormalityError,
        //             meta: {
        //                 title: "查询结果",
        //                 index: 9999,
        //                 //  hmId: ""
        //             }
        //         },
        //         {
        //             path: "detail",
        //             name: "abnormalityDetail",
        //             component: abnormalityDetail,
        //             meta: {
        //                 title: "查询结果",
        //                 index: 9999,
        //                 //  hmId: ""
        //             }
        //         },
        //         {
        //             path: "/",
        //             redirect: {
        //                 name: "abnormalityLogin"
        //             },
        //             meta: {
        //                 title: "异常查询",
        //                 index: 9999,
        //                 //  hmId: ""
        //             }
        //         },
        //     ]
        // },
        // {
        //     path: "/invoice",
        //     name: "invoice",
        //     component: InvoiceIndex,
        //     meta: {
        //         title: "发票查验",
        //         index: 0,
        //         // hmId: "invoice"
        //     }
        // },
        {
            path: '/',
            redirect: {
                name: "taxAccount"
            }
        }
    ]
})