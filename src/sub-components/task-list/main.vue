<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: calc(100% - 50px);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
}
</style>
<template>
    <!-- v-show="show" -->
    <div class="wrap">
        <searchCriteria />
        <!-- <mainContainer /> -->
    </div>
</template>
<script lang='ts'>
import searchCriteria from "./main-search-criteria.vue";
// import mainContainer from "./main-container.vue";
export default {
    // props: ["show"],
    // emits: ["openInfo"],
    components: {
        searchCriteria
        // mainContainer
    },
    setup(props: any, context: any) {
        const openInfo = function(msg: string) {
            context.emit("openInfo", msg);
        };
        return {
            openInfo
        };
    }
};
</script>