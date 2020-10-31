import { createStore } from "vuex";
interface Data {
    realmName: string;
    requestList: Array<any>;
    menuData: any;
    prompt: any;
}
const data: Data = {
    realmName:
        process.env.NODE_ENV === "development"
            ? window.location.origin + "/gczt"
            : window.location.origin +
              "/" +
              window.location.pathname.split("/")[1] +
              "/",
    requestList: [],
    menuData: {},
    //  提示框
    prompt: {
        show: false, //是否展示
        msg: "", //文字
        type: "", //3种类型 error success warn
        img: "", //图片
    },
};

export default createStore({
    strict: process.env.NODE_ENV === "development",
    state: data,
    // 域名
    mutations: {
        // 添加请求
        addRequest(state, data) {
            state.requestList.push(data);
        },
        // 移除带参请求
        //精确删除
        removeParamReq(state, data: any) {
            let count = -1;
            state.requestList.forEach((index: any, n: number) => {
                if (count >= 0) return null;
                if (
                    index.config.url === data.url &&
                    JSON.stringify(index.config.params) ===
                        JSON.stringify(data.params) &&
                    JSON.stringify(index.config.data) ===
                        JSON.stringify(data.data)
                ) {
                    index.c(); //执行取消操作
                    count = n;
                }
            });
            if (count >= 0) {
                state.requestList.splice(count, 1); //把这条记录从数组中移除
            } else {
                // console.log(`未找到${data.url}的请求`);
            }
        },
        // 清除所有请求
        clearRequest(state) {
            state.requestList.forEach((index: any) => {
                index.c();
            });
            state.requestList = [];
        },
        // 移除某个url的请求
        // 模糊删除
        removeUrlReq(state, url: string) {
            let count = -1;
            state.requestList.forEach((index: any, n: number) => {
                if (count >= 0) return null;
                if (index.config.url === url) {
                    index.c(); //执行取消操作
                    count = n;
                }
            });
            if (count >= 0) {
                state.requestList.splice(count, 1); //把这条记录从数组中移除
            } else {
                // console.log(`未找到${url}的请求`);
            }
        },
        // 添加菜单数据
        setMenuData(state, data: any) {
            state.menuData = JSON.parse(JSON.stringify(data));
        },
        // 展示弹框
        showPrompt(state, data) {
            state.prompt = {
                show: true,
                msg: data.msg,
                type: data.type,
                img: data.img,
            };
        },
        // 隐藏弹框
        hiddenPrompt(state) {
            state.prompt.show = false;
        },
    },
    actions: {
        // 添加菜单数据
        setMenuData({ commit }, data: any) {
            data && commit("setMenuData", data);
        },
        // 展示弹框
        showPrompt({ commit }, data: any) {
            data && commit("showPrompt", data);
        },
        // 隐藏弹框
        hiddenPrompt({ commit }) {
            commit("hiddenPrompt");
        },
    },
    modules: {},
});
