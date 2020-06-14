<template>
    <base-table-filter :reset="reset" v-bind="$attrs">
        <a-input>123</a-input>
    </base-table-filter>
</template>

<script>
import BaseTableFilter from '../BaseTableFilter'

export default {
    name: 'ToolLogFilter',
    data() {
        return {}
    },
    methods: {
        reset() {},
    },
    components: {
        BaseTableFilter,
    },
}
</script>

<style scoped></style>
