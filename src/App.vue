<template>
  <div class="wrapper">
    <div class="inner">
      <Header />
      <router-view class="page"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header

  }
}
</script>

<style lang="sass">
body
  margin: 0
  font-family: "Open sans"
  & button
    box-shadow: none
    border: none
    background: transparent
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    & img
      width: 20px
.wrapper
  width: 100%
  display: flex
  justify-content: center
  box-sizing: border-box
.inner
  width: 100%
  max-width: 768px
  margin: 10px
  box-shadow: 2px 4px 8px 1px rgba(34, 60, 80, 0.2)
  border-radius: 10px
  overflow: hidden
.page
  padding: 10px

@media (max-width: 767px)
  .inner
    margin: 0
    border-radius: 0
  .page
    margin-top: 50px
</style>
