<template>
    <div class="wrapper">
      <div class="one"></div>
      <div class="two"></div>
    </div>

</template>

<style scoped>
    .wrapper > div {
      border: 2px solid rgb(233, 171, 88);
      border-radius: 5px;
      background-color: rgba(233, 171, 88, 0.5);
      padding: 1em;
      color: #d9480f;
    }

    .wrapper {
      padding-inline: 10px;
      display: grid;
      grid-template-columns: auto 100px;
    }
    .one {
      grid-column: 1;
      grid-row: 1;
    }
    .two {
      grid-column: 2;
      grid-row: 1;
    }

</style>
