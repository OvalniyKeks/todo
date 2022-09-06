<template>
  <div class="header">

    <router-link
      v-if="$route.name === 'ActionTask'"
      class="back"
      :to="{name: 'Main'}"
    >
      <img src="@/assets/icons/icon_arrow.svg">
      Заметки
    </router-link>

    <router-link
      :to="{name: 'ActionTask', params: {type: 'add'}}"
      class="create"
    >
      <img src="@/assets/icons/icon_create.svg">
    </router-link>

  </div>
</template>
<script>
export default {
}
</script>
<style lang="sass">
.header
  position: relative
  width: calc( 100% - 20px )
  height: 50px
  background: #262626
  display: flex
  justify-content: space-between
  align-items: center
  color: #e5c584
  font-size: 14px
  padding: 0 10px
  & .create
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    // position: absolute
    // right: 10px
    & img
      max-width: 24px

  & .back
    // cursor: pointer
    color: #e5c584
    text-decoration: none
    display: flex
    align-items: center
    line-height: 1
    & img
      width: 18px
      margin-right: 5px



@media screen and (max-width: 767px)
  .header
    position: fixed
</style>
