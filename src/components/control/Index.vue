<template>
    <div class="root_ly">
        <every-day-log />
        <small-tool />
    </div>
</template>

<script>
import EveryDayLog from './EveryDayLog'
import SmallTool from './SmallTool'

export default {
    name: 'Index',
    data() {
        return {}
    },
    beforeCreate() {},
    methods: {},
    mounted() {},
    beforeDestroy() {},
    components: {
        EveryDayLog,
        SmallTool,
    },
}
</script>

<style scoped>
.root_ly {
    display: flex;
    flex-direction: row;
    /*float: left;*/
}
</style>
