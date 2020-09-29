<template>
    <a-result>
        404~
        <p>{{ router_path }}</p>
    </a-result>
</template>

<script>
export default {
    name: 'page_404',
    data() {
        return {
            // router_path: '123',
        }
    },
    created() {
        this.up404Params()
    },
    computed: {
        router_path() {
            return this.$route.params
        },
    },
    methods: {
        up404Params() {
            console.log(
                this.$route.breadcrumbName + '--' + this.$route.fullPath,
            )
        },
    },
}
</script>

<style scoped></style>
