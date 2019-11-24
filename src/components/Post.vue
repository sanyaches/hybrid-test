<template>
  <div class="post-single">
    <a class="anchor post-single__back" @click="$router.go(-1)">← Назад к блогу</a>
    <h1 class="post-single__title">{{ post.title }}</h1>
    <div class="post-single__date">{{ formatDateNow(post.dateTimeStamp) }}</div>
    <p class="post-single__content">{{ post.content }}</p>
    <div class="post-single__comments">
      <h2 class="comments__title" v-if="post.comments.length !==0">
        Все комментарии:
      </h2>
      <h2 class="comments__title" v-else>Никто не оставил комментариев</h2>
      <div class="comments__item comment" v-for="(comment, index) in post.comments" :key="index">
        <div @click="removeComment(index)" class="comment__remove">X</div>
        <div class="comment__date">Дата: {{ formatDateNow(comment.dateTimeStamp) }}</div>
        <div class="comment__author">Имя комментатора: {{ comment.author ? comment.author : 'Без имени' }}</div>
        <div class="comment__text">Текст: {{ comment.text }}</div>
      </div>

      <div class="addition">
        <form @submit.prevent="onSubmit" class="comment-addition form">
          <h2 class="form__title">Оставьте ваш комментарий:</h2>
          <label for="name-commentator"></label>
          <input placeholder="Имя комментатора" type="text" v-model="newCommentAuthorName" class="comment-addition__input input" id="name-commentator">
          <label for="text-comment"></label>
          <textarea placeholder="Текст комментария" v-model="newCommentText" name="text-comment" id="text-comment" cols="10" rows="10" class="input comment-addition__input"></textarea>
          <div @click="addComment" class="button button--medium button--green">Отправить</div>
        </form>
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    name: "Post",
    data () {
      return {
        post : {},
        id: '',
        newCommentText: '',
        newCommentAuthorName: ''
      }
    },

    created() {
      this.id = this.$route.params.id;

      this.getPost();
    },

    methods: {
      onSubmit() {
        //do nothing
      },

      clearFormComment () {
        this.newCommentText = '';
        this.newCommentAuthorName = '';
      },

      removeComment (commentIndex) {
        this.post.comments.splice(commentIndex, 1);
        this.upgradePostInStorage();
      },

      getPost() {
        let posts = JSON.parse(localStorage.getItem('posts'));

        let postsWithId = posts.filter( post => {
          return post.id === +this.id;
        });


        if (postsWithId.length && postsWithId.length !== 0) {
          this.post = postsWithId[0];
        }
        else this.post = {
          title: 'Не найден пост',
          excerpt: '-',
          date: +new Date(),
          content: '-',
          comments: [],
        }
      },

      addComment () {
        let newComment = {
          dateTimeStamp: +new Date(),
          text: this.newCommentText,
          author: this.newCommentAuthorName,
        };

        this.post.comments.push(newComment);

        this.upgradePostInStorage();

        this.getPost();

        this.clearFormComment();
      },

      upgradePostInStorage () {
        let storePosts = JSON.parse(localStorage.getItem('posts'));
        let indexReplace = 0;

        storePosts.forEach( (post, index) => {
          if (post.id === this.post.id) {
            indexReplace = index
          }
        });

        storePosts.splice(indexReplace, 1, this.post);
        //upgrade localStorage
        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(storePosts));
      },

      /**
       * Format date from new Date() to '15 ноября 2019'
       * @returns {string} - str('15 ноября 2019')
       * @param dateNowTimestamp
       */
      formatDateNow: function(dateNowTimestamp) {
        let dateNow = new Date();
        dateNow.setTime(dateNowTimestamp);
        let strDate = '';

        //Add days of month
        strDate += dateNow.getDate();
        strDate += ' ';

        //Add month
        let month = dateNow.getMonth();
        switch (month) {
          case 0: strDate += 'январь'; break;
          case 1: strDate += 'февраля'; break;
          case 2: strDate += 'марта'; break;
          case 3: strDate += 'апреля'; break;
          case 4: strDate += 'мая'; break;
          case 5: strDate += 'июня'; break;
          case 6: strDate += 'июля'; break;
          case 7: strDate += 'августа'; break;
          case 8: strDate += 'сентября'; break;
          case 9: strDate += 'октября'; break;
          case 10: strDate += 'ноября'; break;
          case 11: strDate += 'декабря'; break;
        }
        strDate += ' ';

        //Add year
        strDate += dateNow.getFullYear();

        return strDate;
      },
    },
  }
</script>

<style scoped lang="scss">
  .post-single {
    display: flex;
    flex-direction: column;

    &__back {
      position: fixed;
      top: 10%;
      left: 2%;
      font-size: 24px;
      color: #333333;
      padding: 20px;
      background: #f2f2f2;
    }

    &__content {
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
    }

    &__comments {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .comment-addition {
    &__input {
      border: 1px solid #42b983;
    }
  }

  .comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__item {
      width: 60%;
      margin-top: 20px;
      border: 1px solid gainsboro;
      padding: 15px;
      background: #f2f2f2;
    }
  }

  .comment {
    position: relative;

    &__remove {
      display: none;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      border: 1px solid white;
      background: #3c3c3c;
      color: #ffffff;
      border-radius: 100%;
      z-index: 100;
      cursor: pointer;
    }

    &:hover {
      .comment__remove {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>