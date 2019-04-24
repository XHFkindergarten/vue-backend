<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <h2>感谢注册XHFkindergarten的网站</h2>
    </div>
    <div class="container">
      <h2>您收到的验证码为:</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
h1, h2, h3 {
  font-weight: normal;
  display: block;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
