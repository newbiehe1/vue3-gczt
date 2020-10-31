import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/js/library";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

// 创建 实例化
const createEl = function () {
    const app = createApp(App);
    app.use(ElementPlus);
    app.use(store).use(router).mount("#app");
};

//
const _axios = axios.create({
    baseURL: store.state.realmName,
    method: "post",
});

// 登出
const logOut = function () {
    _axios
        .request({
            url: "login/logout",
        })
        .then(() => {
            store.commit("clearRequest");
        });
};

//请求菜单树
const requestMenuTree = function () {
    _axios
        .request({
            url: "systemManage/main/showSubMenuForBdis",
        })
        .then((res: any) => {
            let data: any = {};
            if (res.data) {
                if (res.data.success) {
                    data = JSON.parse(JSON.stringify(res.data.message));
                    setRouter(data.menuVOList);
                } else {
                    // console.log(res);
                }
            }
            store.dispatch("setMenuData", data);
        });
};
// 赋值路由
const setRouter = function (arr: Array<any>) {
    const data: any = {
        path: "/index",
        name: "首页",
        component: () => import("./views/index.vue"),
        children: [],
    };
    readArrDepth(arr, data.children);
    router.addRoute(data);
    createEl();
};
// 递归
const readArrDepth = function (arr: Array<any>, container: Array<any>) {
    arr.forEach((index: any, n: number) => {
        const urlArr = index.menu_url.split("/");
        let str: string = urlArr[urlArr.length - 1];
        const bigChar: any = str.match(new RegExp("[A-Z]", "g"));
        Array.isArray(bigChar) &&
            bigChar.forEach((val: string) => {
                str = str.replace(val, "-" + val.toLocaleLowerCase());
            });

        const name = index.menu_name;
        container.push({
            path: str,
            name: name,
            component: () => import("./components/" + str + ".vue"),
            children: [],
        });
        if (index.is_leaf === "0") {
            readArrDepth(index.children, container[n].children);
        }
    });
};

// 获取地址栏是否首次访问的为 首页
if (window.location.hash !== "#/" && window.location.hash !== "#/404") {
    requestMenuTree();
} else {
    createEl();
}

// 路由守卫
router.beforeEach((to, from, next) => {
    console.log(from);
    console.log(to);
    if (
        from.matched.some((index: any) => {
            return index.path === to.path && index.name === to.name;
        })
    ) {
        next(false);
    } else {
        store.commit("clearRequest");
        next(true);
    }
    if (to.name === "登录" || to.name === "错误页面") {
        logOut();
        if (router.hasRoute("首页")) {
            router.removeRoute("首页");
        }
    }

    document.title = to.meta.title ? to.meta.title : "工图一点通";
});
