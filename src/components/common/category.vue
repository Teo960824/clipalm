<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/03/31. -->

<template>
  <div class="category">
    <text class="category-text">{{title}}</text>
  </div>
</template>

<style scoped>
.category {
  margin-top: 0px;
  padding-left: 24px;
  width: 750px;
  height: 50px;
  background-color: #7dc8f6;
  justify-content: center;
}

.category-text {
  color: #ffffff;
  /* font-weight: 600; */
  font-size: 27px;
}

</style>

<script>
export default {
  props: {
    title: String
  }
}
</script>
