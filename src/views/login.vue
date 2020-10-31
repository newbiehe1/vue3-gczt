<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    background: #0b8b7e url("../assets/images/login/bg.png") no-repeat center
        center;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .container {
        width: 1424px;
        height: 650px;
        background: #fff;
        border-radius: 50px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 0 0 auto;
        .content {
            flex: 1 1 auto;
            height: 100%;
            .top {
                margin-top: 93px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column nowrap;
                img {
                    margin-bottom: 20px;
                }
                .name {
                    font-size: 36px;
                    font-family: "font";
                    background: linear-gradient(to right, #0de8d2, #0b8b7e);
                    color: transparent;
                    background-clip: text;
                    line-height: 48px;
                }
            }
            .form {
                margin-top: 40px;
                .account,
                .password {
                    width: 400px;
                    height: 74px;
                    margin: 0 auto;
                    box-shadow: 0px 1px 0px 0px #cccccc;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    position: relative;
                    .hr {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 1px;
                        width: 100%;
                        transition: all 0.5s;
                    }
                    input {
                        flex: 1 1 auto;
                        padding: 0 14px;
                        border: 0;
                        outline: none;
                    }
                }
                .password {
                    margin-top: 20px;
                }
                div.submit {
                    width: 200px;
                    height: 46px;
                    border-radius: 23px;
                    font-weight: bold;
                    margin: 60px auto 0 auto;
                    position: relative;
                    overflow: hidden;
                    a.btn {
                        background-image: linear-gradient(
                                90deg,
                                #51f5e4 0%,
                                #2ec0b1 63%,
                                #0b8b7e 100%
                            ),
                            linear-gradient(#ffffff, #ffffff);
                        background-blend-mode: normal, normal;
                        color: #fff;
                        font-size: 22px;
                        letter-spacing: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                    }
                    div {
                        position: absolute;
                        z-index: 1;
                        cursor: context-menu;
                        &::after {
                            content: "";
                            position: absolute;
                            width: 18px;
                            height: 18px;
                            border: 4px solid #fff;
                            border-left-color: transparent;
                            top: calc(50% - 9px);
                            left: calc(50% - 9px);
                        }
                    }
                }
                .tips {
                    width: 400px;
                    position: relative;
                    margin: 0 auto;

                    span {
                        position: absolute;
                        color: red;
                        top: 15px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="wrap">
        <div class="container">
            <img src="../assets/images/login/left-bg.png"
                 alt="">
            <div class="content">
                <div class="top">
                    <img src="../assets/images/login/logo.png"
                         alt="">
                    <div class="name">
                        工图一点通后台系统
                    </div>
                </div>
                <div class="form">
                    <div class="account">
                        <img src="../assets/images/login/user.png"
                             alt="">
                        <input type="text"
                               @focus="focusAccount"
                               @blur="blurAccount"
                               @keydown.enter="submit"
                               v-model.trim="accountVal"
                               placeholder="请输入账号">
                        <div class="hr"
                             :style='style.account'></div>
                    </div>
                    <div class="password">
                        <img src="../assets/images/login/pwd.png"
                             alt="">
                        <input type="password"
                               v-model.trim="passwordVal"
                               @focus="focusPassword"
                               @blur="blurPassword"
                               @keydown.enter="submit"
                               placeholder="请输入密码">
                        <div class="hr"
                             :style='style.password'></div>
                    </div>
                    <div class="tips">
                        <span>
                            {{tips}}
                        </span>
                    </div>
                    <div class="submit">
                        <div class="loader loader-default is-active"
                             v-show='loading'></div>
                        <a href="javascript:;"
                           @click.stop="submit"
                           class="btn">
                            登录
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Base64 } from "js-base64";
import { toRefs, reactive, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const API = {
            login: "login/login_login",
            menuTree: "systemManage/main/showSubMenuForBdis"
        };
        const request: any = {};
        const axios: any = inject("axios");
        const store: any = useStore();
        const router: any = useRouter();
        const state: any = reactive({
            tips: "",
            style: {
                password: {},
                account: {}
            },
            passwordVal: "",
            accountVal: "",
            loading: false
        });

        // 账号获取焦点
        const focusAccount = function() {
            state.style.account = {
                width: "100%",
                backgroundColor: "#0b8b7e"
            };
        };
        // 账号失去焦点
        const blurAccount = function() {
            if (state.accountVal) {
                state.style.account = {};
            } else {
                state.style.account = {
                    width: "100%",
                    backgroundColor: "red"
                };
            }
        };
        // 密码获取焦点
        const focusPassword = function() {
            state.style.password = {
                width: "100%",
                backgroundColor: "#0b8b7e"
            };
        };
        // 账号失去焦点
        const blurPassword = function() {
            if (state.passwordVal) {
                state.style.password = {};
            } else {
                state.style.password = {
                    width: "100%",
                    backgroundColor: "red"
                };
            }
        };
        // 提交
        const submit = function() {
            if (!state.accountVal) {
                state.tips = "请输入账号";
                state.style.account = {
                    width: "100%",
                    backgroundColor: "red"
                };
            } else if (!state.passwordVal) {
                state.tips = "请输入密码";
                state.style.password = {
                    width: "100%",
                    backgroundColor: "red"
                };
            } else {
                requestSubmit();
            }
        };
        // 提交请求
        const requestSubmit = function() {
            if (request.login) {
                store.commit("removeParamReq", request.login);
            }
            request.login = {
                url: API.login,
                params: {
                    accountId: Base64.encode(state.accountVal),
                    password: Base64.encode(state.passwordVal)
                }
            };
            axios
                .request(JSON.parse(JSON.stringify(request.login)))
                .then((res: any) => {
                    if (res.data) {
                        if (res.data.success) {
                            requestMenuTree();
                        } else {
                            state.loading = false;
                        }
                        state.tips = res.data && res.data.message;
                    }
                })
                .catch((res: any) => {
                    state.loading = false;
                });
        };
        //请求树菜单
        const requestMenuTree = function() {
            axios
                .request({
                    url: API.menuTree
                })
                .then((res: any) => {
                    let data: any = {};
                    if (res.data.success) {
                        data = JSON.parse(JSON.stringify(res.data.message));
                        setRouter(data.menuVOList);
                    } else {
                        state.loading = false;
                        state.tips = "加载菜单失败";
                    }
                    store.dispatch("setMenuData", data);
                    router.push({
                        path: "/index"
                    });
                })
                .catch((error: any) => {
                    state.loading = false;
                });
        };
        // 赋值路由
        const setRouter = function(arr: Array<any>) {
            const routerData = {
                path: "/index",
                name: "首页",
                component: () => import("./index.vue"),
                children: []
            };
            readArrDepth(arr, routerData.children);
            router.addRoute(routerData);
        };
        // 递归
        const readArrDepth = function(arr: Array<any>, container: Array<any>) {
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
                    component: () => import("../components/" + str + ".vue"),
                    children: []
                });
                if (index.is_leaf === "0") {
                    readArrDepth(index.children, container[n].children);
                }
            });
        };
        return {
            ...toRefs(state),
            blurAccount,
            focusPassword,
            focusAccount,
            blurPassword,
            submit
        };
    }
};
</script>