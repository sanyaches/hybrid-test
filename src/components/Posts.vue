<template >
  <div class="posts-wrap mw">

    <h1 class="h1-light">Личный блог</h1>

    <features/>

    <addition-post @updated-posts="updatePosts"/>

    <div class="form-wrapper">
      <form @submit.prevent="onSubmit" v-if="this.showEditForm" class="form" id="edit-form">
        <h2>Редактирование записи</h2>

        <label for="edit-title"></label>
        <input type="text" placeholder="Заголовок" class="input input--silver" id="edit-title" v-model="currentPost.title">

        <label for="edit-excerpt"></label>
        <textarea class="input input--silver" placeholder="Краткое описание" id="edit-excerpt" v-model="currentPost.excerpt"></textarea>

        <label for="edit-content"></label>
        <textarea class="input input--silver" placeholder="Полный текст записи" id="edit-content" v-model="currentPost.content"></textarea>

        <div @click="upgradePost" class="button button--medium button--green">Обновить</div>
      </form>
    </div>

    <div class="posts">
      <div class="post" v-for="(post, index) in postsForPage" :key="index">
          <div @click="removePost(post.id)" class="post__remove" title="Удалить">X</div>
          <div @click="openFormEdit(index)" title="Редактировать" class="post__edit"></div>
          <div class="post__date_image">{{ formatDateNow(post.dateTimeStamp) }}</div>
        <router-link class="post__link" :to="'/post/' + post.id">
          <h3 class="post__title">{{ post.title }}</h3>
          <p class="post__excerpt">{{ post.excerpt }}</p>
          <p class="post__comments">
            {{ post.comments.length === 0 ?
            `Комментарии отсутствуют` :
            `Комментариев: ${post.comments.length}`}}
          </p>
        </router-link>
      </div>
    </div>

    <div class="arrow">
      <router-link :to="'/posts/' + prevPage" v-if="prev" class="arrow__link">
        ← Новые
      </router-link>
      <div v-else class="arrow__link arrow__link--disable">← Новые</div>

      <router-link :to="'/posts/' + nextPage" v-if="next" class="arrow__link"> Старые →</router-link>
      <div v-else class="arrow__link arrow__link--disable"> Старые → </div>
    </div>

  </div>
</template>

<script>
  import AdditionPost from "./AdditionPost";
  import Features from "./Features";
  export default {
    components: {Features, AdditionPost},
    data () {
      return {
        posts: JSON.parse(localStorage.getItem('posts')),
        page: '',
        postsInPage: 8,
        next: '',
        prev: '',
        nextPage: '',
        prevPage: '',
        showEditForm: false,
        currentPost: {},
      }
    },

    created () {
      this.getPosts();
    },
    watch: {
      $route () {
        this.getPosts();
      },

      posts () {
        this.getPosts();
      }
    },
    computed : {
      postsForPage () {
        let startId = ((+this.page-1)*this.postsInPage);

        return this.posts.slice(startId, startId+this.postsInPage)
      },
    },
    methods: {
      getPosts() {
        this.page = this.$route.params.id;
        this.nextPage = +this.page + 1;
        this.prevPage = +this.page - 1;

        this.posts.length > (this.postsInPage * (+this.page)) ? this.next = true : this.next = false;
        this.prevPage < 1 ? this.prev = false : this.prev = true;
      },

      onSubmit () {
        //do nothing.
      },

      openFormEdit(indexClicked) {
        this.currentPost = this.postsForPage[indexClicked];
        this.showEditForm = !this.showEditForm;

        setTimeout(function () {
          document.getElementById('edit-form').scrollIntoView()
        }, 400);
      },

      upgradePost () {
        let storePosts = JSON.parse(localStorage.getItem('posts'));
        let indexReplace = 0;

        storePosts.forEach( (post, index) => {
          if (post.id === this.currentPost.id) {
            indexReplace = index
          }
        });

        storePosts.splice(indexReplace, 1, this.currentPost);
        //upgrade localStorage
        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(storePosts));

        this.currentPost = {};
        this.showEditForm = !this.showEditForm;
        this.updatePosts();
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

      /**
       * Update posts from localStorage
       */
      updatePosts () {
        this.posts = JSON.parse(localStorage.getItem('posts'));
      },

      removePost(postId) {
        let removeIndex = 0;

        this.posts.forEach((post, index) => {
          post.id === postId ? removeIndex = index : ''
        });
        this.posts.splice(removeIndex, 1);

        this.upgradePostsStorage(this.posts);
      },

      upgradePostsStorage(posts) {
        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    },
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');
  .mw {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  .form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .posts {
    display: grid;
    grid-row-gap: 4rem;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 40px 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    &-wrap {
      padding-bottom: 1rem;
      padding-top: 1rem;
      @media (max-width: 768px) {
        padding-top: .5rem;
      }
    }

    .post {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #f2f2f2;
      padding: 20px;

      &:hover {
        .post__title {
          text-decoration: underline;
        }

        .post__remove, .post__edit {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      &:first-child {
        grid-column: 1/3;
        @media (max-width: 768px) {
          grid-column: 1/3;
          height: 250px;
        }
      }

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

      &__edit {
        display: none;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 10px;
        right: 50px;
        border: 1px solid white;
        background: white url("../assets/edit.png") no-repeat center;
        background-size: 60%;
        color: #ffffff;
        border-radius: 100%;
        z-index: 100;
        cursor: pointer;
      }
    }

    .post__link {
      color: #111111;
      text-decoration: none;
      &:visited {
        color: #333333;
      }
    }
  }

  .arrow {
    display: flex;
    justify-content: center;
    font-size: 20px;

    &__link {
      color: #0B743A;
      &:visited {
        color: #0B743A;
      }
      &:first-child {
        margin-right: 20px;
      }
    }
  }
</style>
