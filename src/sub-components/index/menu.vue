<style lang="scss" scoped>
.list {
    .container {
        .content {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            &.on {
                img {
                    transform: rotate(180deg);
                }
            }

            &.leaf {
                .name {
                    width: 100%;
                }
                &.on {
                    background: url("../../assets/images/index/on.png")
                        no-repeat top left;
                    box-shadow: 7px 7px 16px 0px rgba(11, 139, 126, 0.4);
                    .name {
                        color: #0b8b7e;
                    }
                }
            }
            .name {
                background-repeat: no-repeat;
                background-color: transparent;
                background-position: left center;
                padding-left: 25px;
                width: calc(100% - 20px);
                color: #666;
            }
        }
    }
}
</style>
<template>
    <div class="list"
         v-for="item in menuList"
         v-show='show'
         :key="item.menu_id">
        <div class="container">
            <div class="content"
                 :class="{'leaf':Number(item.is_leaf),'on':item.show}"
                 :style='{paddingLeft:left+"px"}'
                 @click.stop="chooseMenu(item)">
                <div class="name"
                     :style='"background-image: url("+item.icon+")"'>
                    {{item.menu_name}}
                </div>
                <img src="../../assets/images/index/drop.png"
                     alt=""
                     v-if="item.is_leaf==='0'">
            </div>
        </div>
        <menuContainer v-if='item.is_leaf==="0"'
                       :list='item.children'
                       :left='left+20'
                       :show='item.show'
                       :pathList='paths'
                       @findParent='hideSiblings'
                       @setCrumbs='setCrumbs'
                       :ref='el=>setRefData(el,item)' />
    </div>
</template>
<script lang='ts'>
import { reactive, toRefs, ref, watch, computed, defineComponent } from "vue";
declare function require(string: string): string;
export default defineComponent({
    props: ["list", "show", "left", "pathList"],
    name: "menuContainer",
    emits: ["findParent", "setCrumbs"],
    setup(props, context) {
        const child: any = ref({});
        const state: any = reactive({
            menuList: [],
            paths: []
        });

        // 初始化展示状态
        const initShowState = function(data: any, n: number) {
            const path = Array.isArray(props.pathList) && props.pathList[0];

            const urlArr = data.menu_url.split("/");
            let str: string = urlArr[urlArr.length - 1];
            const bigChar: any = str.match(new RegExp("[A-Z]", "g"));
            Array.isArray(bigChar) &&
                bigChar.forEach((index: string) => {
                    str = str.replace(index, "-" + index.toLocaleLowerCase());
                });

            if (path) {
                data.show = str === path;
                if (data.is_leaf === "1" && data.show) {
                    context.emit("setCrumbs", [data]);
                }
            }
        };

        // 监听list 数据变化
        watch(
            props.list,
            (val: Array<any>) => {
                const list: Array<any> = JSON.parse(JSON.stringify(val));
                list.forEach((index: any, n: number) => {
                    initShowState(index, n);

                    if (Number(index.big_icon_name)) {
                        index.icon = require("../../assets/images/index/icon/" +
                            index.big_icon_name +
                            ".png");
                    } else {
                        index.icon = index.big_icon_name;
                    }
                });
                state.menuList = list;
            },
            {
                immediate: true,
                deep: true
            }
        );

        (function() {
            const arr = JSON.parse(JSON.stringify(props.pathList));
            arr.shift();
            state.paths = arr;
        })();

        // 获取子组件列表
        const setRefData = function(el: any, data: any) {
            if (el) {
                child[data.menu_id] = el;
            }
        };
        // 选择菜单
        const chooseMenu = function(data: any) {
            state.menuList.forEach((index: any) => {
                index.show = index.menu_id === data.menu_id;
            });

            if (data.menu_parent > 0) {
                context.emit("findParent", data);
            }
            if (data.is_leaf === "1") {
                context.emit("setCrumbs", [data]);
            }
        };
        // 赋值面包屑
        const setCrumbs = function(arr: Array<any>) {
            const data = state.menuList.find(
                (index: any) => arr[0].menu_parent === index.menu_id
            );
            if (data) arr.unshift(data);
            context.emit("setCrumbs", arr);
        };
        // 隐藏兄弟节点
        const hideSiblings = function(data: any) {
            for (let a in child) {
                if (Number(a) === data.menu_parent) {
                    continue;
                } else {
                    const el = child[a];
                    el.menuList &&
                        el.menuList.forEach((index: any) => {
                            index.show = false;
                        });
                }
            }
            if (state.menuList[0] && state.menuList[0].menu_parent > 0) {
                context.emit("findParent", state.menuList[0]);
            }
        };
        return {
            ...toRefs(state),
            setRefData,
            chooseMenu,
            hideSiblings,
            setCrumbs
        };
    }
});
</script>