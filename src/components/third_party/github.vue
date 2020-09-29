<template>
    <div>
        github
        <p>{{ this.$route.fullPath }}</p>
        <p>{{ this.$route.path }}</p>
        <p>{{ this.$route.params }}</p>
        <p>{{ this.$route.query }}</p>
        <p>{{ this.$route.hash }}</p>
        <a @click="to()">random</a>
    </div>
</template>

<script>
export default {
    name: 'github',
    data() {
        return {}
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to)
    },
    methods: {
        to() {
            this.$router.push(`/github/${Math.random()}#123`)
            // this.$router.go(-1)
        },
    },
}
</script>

<style scoped></style>
