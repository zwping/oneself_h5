<template>
  <div>
    <a-tabs hide-add size="small" type="editable-card" v-model="activeKey" default-active-key="控制台" @edit="onTabsEdit"
            @tabClick="onTabClick">
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.key !== '控制台'">
        <component v-bind:is="pane.content" :API="pane.api"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {Tabs} from 'ant-design-vue'
  import controlIndex from '../control/Index'
  import {subscribe} from '../../libs/Bus'

  export default {
    name: 'FrameContent',
    data() {
      const panes = [
        {title: '控制台', content: controlIndex, key: '控制台', clo: false}
      ]
      const lastPanesKey = ['控制台']
      return {
        panes,
        lastPanesKey,
        activeKey: panes[0]['key']
      }
    },
    components: {
      'control_index': controlIndex,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane
    },
    methods: {
      onTabClick(key) {
        this.lastPanesKey.push(key)
      },
      onTabsEdit(key, action) {
        this[action](key)
      },
      add(pane) {
        let key = pane['key']
        let exist = false
        for (let i in this.panes) {
          if (this.panes[i]['key'] === key) {
            exist = true
          }
        }
        if (!exist) {
          this.panes.push(pane)
        }
        this.activeKey = key
        this.lastPanesKey.push(key)
      },
      remove(key) {
        let panes = this.panes.filter(pane => pane.key !== key)
        this.panes = panes
        this.lastPanesKey = this.lastPanesKey.filter(k => k !== key)
        this.activeKey = this.lastPanesKey[this.lastPanesKey.length - 1]
      }
    },
    created() {
      subscribe('fc_tabs', it => {
        this.add(it)
      })
    }
  }
</script>

<style scoped>

</style>
