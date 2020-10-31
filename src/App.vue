<style>
@import url("./assets/css/reset.min.css");
/* @import url("../node_modules/element-ui/lib/theme-chalk/index.css"); */
@import url("../node_modules/pure-css-loader/dist/css-loader.css");
@font-face {
    font-family: "font";
    src: url("./assets/font/font.ttf");
}
* {
    font-size: 14px;
    box-sizing: border-box;
    color: #333;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-position-enter-active,
.fade-position-leave-active {
    transition: opacity 0.5s;
    position: absolute;
}
.fade-position-enter-from,
.fade-position-leave-to {
    opacity: 0;
}

.model-enter-active,
.model-leave-active {
    transition: all ease 0.5s;
}
.model-enter-from,
.model-leave-to {
    opacity: 0;
    transform: translateY(-60px);
}
.model-enter-to,
.model-leave-from {
    opacity: 1;
    transform: translateY(0px);
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <router-view />
</template>
<script lang='ts'>
import axios from "./assets/js/axios";
import { provide } from "vue";
export default {
    setup() {
        provide("axios", axios);
    }
};
</script>