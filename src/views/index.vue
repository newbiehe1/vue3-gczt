<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    background-color: #edf1f1;
    .top {
        height: 60px;
        background-color: #0b8b7e;
        box-shadow: 0px 0px 9px 0px rgba(3, 40, 70, 0.2);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        div.logo {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            img {
                margin-right: 15px;
            }
            .name {
                font-family: font;
                font-size: 26px;
                color: #fff;
                letter-spacing: 1px;
            }
        }
        div.flex-end {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            div.news,
            div.notice {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #defaf7;
                margin-right: 50px;
            }
            .account {
                font-size: 16px;
                color: #fff;
            }
        }
    }
    .main {
        height: calc(100% - 60px);
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .menu {
            width: 220px;
            background-color: #fff;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .container {
            margin-left: 16px;
            width: calc(100% - 236px);
            height: 100%;
            .crumbs {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 46px;
                flex-flow: row nowrap;
                .item {
                    flex: 0 0 auto;
                    &.default {
                        color: #999999;
                        font-size: 12px;
                    }
                    &.active {
                        color: #333;
                        font-size: 12px;
                    }
                    span {
                        margin: 0 5px;
                    }
                }
            }
            .context {
                width: 100%;
                height: calc(100% - 46px);
            }
        }
    }
}
</style>
<template>
    <div class="wrap">
        <div class="top">
            <div class="logo">
                <img src="../assets/images/index/logo.png"
                     alt="">
                <div class="name">
                    工图一点通后台系统
                </div>
            </div>
            <div class="flex-end">
                <div class="news">
                    <img src="../assets/images/index/msg.png"
                         alt="">
                </div>
                <div class="notice">
                    <img src="../assets/images/index/ld.png"
                         alt="">
                </div>
                <div class="account">
                    {{menuData.accountName}}
                </div>
            </div>
        </div>
        <div class="main">
            <div class="menu">
                <menuContainer :list='menuData.menuVOList'
                               :pathList='list'
                               :left='20'
                               @setCrumbs='setCrumbs'
                               :show='true' />
            </div>
            <div class="container">
                <div class="crumbs">
                    <div class="item"
                         :class="(index+1===crumbs.length?'active':'default')"
                         v-for="(item,index) in crumbs"
                         :key="index">
                        {{item}}
                        <span v-if='index+1<crumbs.length'>
                            /
                        </span>
                    </div>
                </div>
                <div class="context">
                    <router-view v-slot="{ Component }">
                        <transition name="fade-position">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import menuContainer from "../sub-components/index/menu.vue";
export default {
    components: {
        menuContainer
    },
    setup() {
        const store: any = useStore();
        const menuData = computed(() => {
            return store.state.menuData;
        });
        const route = useRoute();
        const router = useRouter();
        const state: any = reactive({
            crumbs: [],
            list: []
        });
        // 默认选中第一个
        const defaultMenu = function(
            container: Array<any>,
            arr: Array<string>
        ) {
            const data: any = arr[0];
            if (data) {
                container.push(data.menu_url);
                if (data.is_leaf === "0") {
                    defaultMenu(container, data.children);
                }
            }
        };
        // 第一次加载是获取路径
        (function() {
            const path = route.path;
            let arr: Array<any> = path.split("/");
            arr.splice(0, 2);
            if (arr.length < 1) {
                defaultMenu(arr, menuData.value.menuVOList);
            }
            state.list = arr;
        })();

        // 赋值面包屑
        const setCrumbs = function(arr: Array<any>) {
            state.crumbs = arr.map((index: any) => {
                return index.menu_name;
            });
            router.push({
                name: arr[arr.length - 1].menu_name
            });
        };

        return {
            menuData,
            setCrumbs,
            ...toRefs(state)
        };
    }
};
</script>
