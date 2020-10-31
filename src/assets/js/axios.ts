import axios from "axios";
import store from "../../store";
import router from "../../router";
const CancelToken = axios.CancelToken;
const b = axios.create({
    baseURL: store.state.realmName,
    method: "post",
});

//http response 拦截器
b.interceptors.response.use(
    (res) => {
        console.log("结果", res);
        if (res.status === 200) {
            if (res.data.state === 0) {
                store.dispatch("showPrompt", {
                    show: true,
                    msg: res.data.message,
                    type: "error",
                });
            }
        } else {
            if (res.data.status === 1000) {
                router.push({
                    path: "/404",
                });
            }
        }

        return res;
    },
    (error) => {
        console.log("错误", error);
        if (axios.isCancel(error)) {
            // console.log("cancel");
        } else {
            store.dispatch("showPrompt", {
                msg: "未知错误，请联系管理员",
                type: "error",
            });
            return Promise.reject(error);
        }
    }
);
// 状态码处理
b.defaults.validateStatus = (res: any) => {
    // console.log("状态码", res);

    if (res !== 500 && res !== 200) {
        store.dispatch("showPrompt", {
            type: "error",
            msg: "状态码" + res,
        });
    }
    return res;
};

export default {
    request(config: any) {
        return b.request(
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    store.commit("addRequest", {
                        config: config,
                        c: c,
                    });
                }),
            })
        );
    },
    get(url: string, config: any) {
        return b.get(
            url,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let data = config
                        ? {
                              url: url,
                              ...config,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: data,
                        c: c,
                    });
                }),
            })
        );
    },
    delete(url: string, config: any) {
        return b.delete(
            url,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let data = config
                        ? {
                              url: url,
                              ...config,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: data,
                        c: c,
                    });
                }),
            })
        );
    },
    head(url: string, config: any) {
        return b.head(
            url,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let data = config
                        ? {
                              url: url,
                              ...config,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: data,
                        c: c,
                    });
                }),
            })
        );
    },
    options(url: string, config: any) {
        return b.options(
            url,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let data = config
                        ? {
                              url: url,
                              ...config,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: data,
                        c: c,
                    });
                }),
            })
        );
    },
    post(url: string, data: any, config: any) {
        return b.post(
            url,
            data,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let item = data
                        ? {
                              url: url,
                              ...data,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: item,
                        c: c,
                    });
                }),
            })
        );
    },
    put(url: string, data: any, config: any) {
        return b.put(
            url,
            data,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let item = data
                        ? {
                              url: url,
                              ...data,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: item,
                        c: c,
                    });
                }),
            })
        );
    },
    patch(url: string, data: any, config: any) {
        return b.put(
            url,
            data,
            Object.assign({}, config, {
                cancelToken: new CancelToken((c) => {
                    let item = data
                        ? {
                              url: url,
                              ...data,
                          }
                        : { url: url };
                    store.commit("addRequest", {
                        config: item,
                        c: c,
                    });
                }),
            })
        );
    },
};
