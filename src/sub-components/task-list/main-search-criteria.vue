<style lang="scss" scoped>
</style>
<template>
    <div class='search-criteria'>
        <div class="top">
            <div class="search-box">
                <div class="name">
                    搜索：
                </div>
                <input type="text">
            </div>
            <div class="time-slot">
                <el-date-picker v-model="value"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
                <i></i>
                <!-- <date-picker type="datetime"
                             :picker-options="endTimeConfig"
                             value-format="yyyy-MM-dd HH:mm:ss"
                             format="yyyy-MM-dd HH:mm:ss"
                             v-model="form.endTime"
                             :clearable="false" /> -->
            </div>
        </div>

    </div>
</template>
<script lang='ts'>
import { reactive, toRefs } from "vue";
export default {
    setup() {
        const state: any = reactive({
            startTimeConfig: {},
            endTimeConfig: {},
            form: {
                startTime: "",
                endTime: ""
            },
            value: ""
        });
        return {
            ...toRefs(state)
        };
    }
};
</script>