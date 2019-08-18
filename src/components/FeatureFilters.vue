<template>
    <v-layout class="filterFeature pr-4 pl-4" column>
      <v-text-field
        label="Search"
        v-model="text"
        @input="onChange">
      ></v-text-field>

      <!-- filter by tags -->
      <v-select
          :items="tags" v-model="selectedTags" label="Search Tags" attach multiple
          chips
          deletable-chips
          return-object
          item-text="name"
          item-value="id"
          @change="filterFeaturesByTags"
      >
      </v-select>

      <!-- filter of categories -->
      <v-select
          :items="categories" v-model="selectedCategories" label="Search Categories" attach multiple
          chips
          deletable-chips
          return-object
          item-text="name"
          item-value="id"
          @change="filterFeaturesByCategories"
      >
      </v-select>

      <!-- filter of versions -->
      <v-select
          :items="versions" v-model="selectedVersions" label="Search Versions" attach multiple
          chips
          deletable-chips
          return-object
          item-text="name"
          item-value="id"
          @change="filterFeaturesByVersions"
      >
      </v-select>
    </v-layout>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'featureFilters',

  data: () => ({
    text: '',
    selectedTags: [],
    selectedCategories: [],
    selectedVersions: [],
  }),
  computed: {
    ...mapState('featureModule', ['tags', 'versions', 'categories']),
  },
  methods: {
    ...mapActions('featureModule', ['filterFeaturesBySearch', 'filterFeaturesByTags', 'filterFeaturesByVersions', 'filterFeaturesByCategories']),

    onChange() {
      this.filterFeaturesBySearch(this.text);
    },
  },
};
</script>
