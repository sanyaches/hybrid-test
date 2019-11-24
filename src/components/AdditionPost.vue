<template>
  <div class="addition">
    <div @click="showFormAddPost = !showFormAddPost" v-if="!showFormAddPost" class="addition__button button button--medium button--green">Добавить пост</div>
    <span class="addition__close" v-if="showFormAddPost" @click="showFormAddPost = !showFormAddPost">X</span>

    <form class="form" v-if="showFormAddPost" @submit.prevent="onSubmit">
      <h2>Форма добавления записи в блог</h2>

      <label for="title"></label>
      <input id="title" class="input input--silver" type="text" v-model="title" placeholder="Заголовок записи">

      <label for="excerpt"></label>
      <textarea class="input input--silver" id="excerpt" v-model="excerpt" placeholder="Краткое описание записи">
      </textarea>

      <label for="content"></label>
      <textarea class="input input--silver" id="content" v-model="content" placeholder="Полный текст записи">
      </textarea>

    </form>
    <div @click="addPost" v-if="showFormAddPost" class="addition__button button button--medium button--green">Добавить пост</div>
  </div>

</template>

<script>
  export default {
    name: "AdditionPost",
    data () {
      return {
        showFormAddPost: false,
        title: '',
        excerpt: '',
        content: '',
      }
    },
    methods: {
      onSubmit () {
        //do nothing
      },

      addPost () {
        this.showFormAddPost = !this.showFormAddPost;
        this.pushPosts(this.title, this.excerpt, this.content);
        this.title = '';
        this.excerpt = '';
        this.content = '';
        this.$emit('updated-posts')
      },

      pushPosts( title, excerpt, content ) {
        let posts = JSON.parse(localStorage.getItem('posts'));
        let lastId = 1;

        if (posts.length && posts.length !== 0) {
          lastId = posts[posts.length - 1].id;
        }

        posts.push({
          id: lastId + 1,
          title: title,
          excerpt: excerpt,
          content: content,
          dateTimeStamp: + new Date(),
          comments: [],
        });

        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(posts));
      },
    }
  }
</script>

<style lang="scss">
.addition {
  position: relative;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__button {
    width: 30%;
  }

  &__close {
    display: none;
    position: absolute;
    top: 10px;
    right: 50px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: #333333;
    border: 1px solid white;
    border-radius: 100%;
    color: #ffffff;
  }
  &:hover {
    .addition__close {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
.form {
  position: relative;
  margin: 20px 0;
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button--green {
  background-color: #0B743A;
  color: #f2f2f2;
}

.button--medium {
  padding: 18px 57px;
  font-size: 22px;
  line-height: 120%;
}
.button {
  text-align: center;
  cursor: pointer;
  transition: all .5s;
}

.input {
  margin: 10px 0;
  padding: 17px 17px;
  font-size: 22px;
  line-height: 26px;
  font-family: "Roboto", sans-serif;
  color: #333333;
  font-style: italic;
  border: none;
  width: 100%;
  max-width: 100%;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.input--silver {
  background: #f2f2f2;
}
</style>