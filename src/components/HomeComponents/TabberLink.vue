<template>
  <div id="tabbarLink">
    <a
      v-for="(item, index) in LinkList"
      :key="index"
      @click="triggerPage(item.path)"
    >
      <Icon :type="item.imageURL" /> {{item.name}}
    </a>
  </div>
</template>
<script>
export default {
  name: "tablink",
  data() {
    return {
      LinkList: [
        { name: "首页", imageURL: "md-home", path: "/" },
        {
          name: "文章列表",
          imageURL: "ios-bookmarks-outline",
          path: "/article",
        },
        { name: "Demo", imageURL: "logo-youtube", path: "/demo" },
        { name: "云相册", imageURL: "md-images", path: "/photos" },
        { name: "个人信息", imageURL: "md-person", path: "/profile" },
        { name: "留言板", imageURL: "ios-create", path: "/message" },
        {
          name: "GitHub",
          imageURL: "logo-github",
          path: "https://github.com/cosyer",
        },
        { name: "登录 / 注册", imageURL: "md-contact", path: "/login" },
      ],
    };
  },
  methods: {
    triggerPage(path) {
      if (path == "/login") {
        if (localStorage.getItem("username")) {
          this.$router.push("/logined");
          return;
        }
      } else if (path == "https://github.com/cosyer") {
        return window.open(path);
      }
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "cosyer";
  src: url("../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf");
}
#tabbarLink {
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  a {
    font-family: "cosyer";
    color: #f2f2f2;
    margin: 0 1rem;
    padding: 0.3rem;
    font-size: 13px;
    transition: all 0.5s;
  }
  a:hover {
    background: #222;
    border-radius: 5px;
    color: lightgreen;
  }
}
</style>