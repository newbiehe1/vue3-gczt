<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: calc(100% - 20px);
    .top {
        height: 50px;
        background-color: #fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: 2px solid #0b8b7e;
        .list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-flow: row nowrap;
            height: 100%;
        }
    }
}
</style>
<template>
    <div class="wrap">
        <div class="top">
            <div class="list">
                <div class="item">
                    <!-- @click="openDefaultMain"
                     :class="{'on':defaultMain}" -->
                    任务列表
                </div>
                <!-- <div class="item"
                     @click="chooseNav(b)"
                     v-for="(a,b) in list"
                     :key="b">
                    {{b}}
                </div> -->
            </div>
        </div>
        <div class="main">
            <defaultMain />
            <!-- <defaultMain @openInfo='addInfoPage'
                         :show="defaultMain" /> -->
            <!-- <span v-for="(a,b) in list"
                  :key="b"
                  v-show='a'>
                {{b}}
            </span> -->
        </div>
    </div>
</template>
<script lang='ts'>
import defaultMain from "../sub-components/task-list/main.vue";
// import infoMain from "../sub-components/task-list/info.vue";
import { reactive, toRefs } from "vue";
export default {
    components: {
        defaultMain
        // infoMain
    },
    setup() {
        const state: any = reactive({
            list: {},
            defaultMain: true
        });
        // 添加详情页
        const addInfoPage = function(data: string) {
            state.list[data] = true;
            state.defaultMain = false;
        };
        // 切换导航
        const chooseNav = function(data: string) {
            state.defaultMain = false;
            for (let a in state.list) {
                state.list[a] = a === data;
            }
        };
        // 打开默认子页面
        const openDefaultMain = function() {
            state.defaultMain = true;
            for (let a in state.list) {
                state.list[a] = false;
            }
        };
        return {
            ...toRefs(state)
            // addInfoPage,
            // chooseNav,
            // openDefaultMain
        };
    }
};
</script>