<template>
<div>
    <el-tree :data="data" :props="defaultProps" @check="handleNodeClick" show-checkbox ></el-tree>
    <button>被选择的节点{{this.$store.getters.selectedNode}}</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        };
    },
    created() {
    this.getData();
  },

    methods: {
        getData() {
            this.data = this.$store.getters.sidebarTree;
            // 替换一些字段名，渲染成树状
            this.data = JSON.parse(JSON.stringify(this.data).replace(/companies/g, 'children').replace(/equipments/g, 'children').replace(/unique/g, 'name'))
            console.log(this.data);
        },

      handleNodeClick(nodeObj, SelectedObj) {
        // console.log(nodeObj.id);
        this.$store.dispatch('setSelectedNode', nodeObj);
        // console.log(SelectedObj);
      },
    }
}
</script>

<style>
.el-tree-node__label{
      font-size: 12px;
      font-weight: 400;
  }
</style>