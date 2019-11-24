<template>
  <div class="features">
    <div class="features__grid">
      <div class="features__column">
        <img class="features__image" src="../assets/blog.jpg" alt="Blog logo">
      </div>

      <div class="features__column">
        <div class="features__title">Блог имеет следующие возможности</div>
        <ul>
          <li class="features__item">Добавлять новую запись</li>
          <li class="features__item">Удалять запись при наведении</li>
          <li class="features__item">Листать с помощью ссылок внизу</li>
          <li class="features__item">Открывать страницу отдельной записи</li>
          <li class="features__item">Добавлять комментарии</li>
          <li class="features__item">Удалять комментарии</li>
          <li class="features__item">Редактирования записи</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Features"
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

  .features {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
    &__item, &__title {
      text-align: left;
    }
    &__column {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__image {
      width: 100%;
      height: auto;
    }

    ul {
      padding-left: 20px;
    }

    &__grid {
      display: grid;
      grid-template-columns: 2fr 4fr;
      grid-column-gap: 60px;
    }
  }
</style>