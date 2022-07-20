<template>
  <div v-if="menu">
    <div v-for="(menuGroup, menuIndex) in menu" :key="menuIndex">
      <!-- v-if="!menuGroup.roles || $can('read', menuGroup.roles)" -->
      <div>
        <q-separator />

        <q-item v-if="menuGroup.title" clicable="false">
          <q-item-section v-if="menuGroup.icon" avatar>
            <q-icon :name="menuGroup.icon" color="grey-5" size="xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>{{ menuGroup.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <div v-for="(link, linkIndex) in menuGroup.links" :key="linkIndex">
          {{ link.active }}
          <q-item
            :to="link.link"
            :class="'n-menu-item text-' + link.color"
            active-class="bg-grey-4"
            clickable
            exact
          >
            <q-item-section v-if="link.icon" avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  menu: {
    type: Array,
    required: true,
    default: null
  }
})
</script>

<style>
.n-menu-item {
  min-height: 57px !important;
}
</style>
