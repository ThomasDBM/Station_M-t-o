<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
        <div class="md-collapse">
          <md-list>
            <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <md-list-item href="#/maps">
              <i class="material-icons">location_on</i>
              <p class="hidden-lg hidden-md">Map</p>
            </md-list-item>

            <li class="md-list-item">
              <div class="md-list-item-content">
                <drop-down>
                  <md-button
                    slot="title"
                    class="md-button md-just-icon md-simple"
                    data-toggle="dropdown"
                  >
                    <md-icon>settings_input_antenna</md-icon>
                    <p class="hidden-lg hidden-md">add Station</p>
                  </md-button>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li>
                      <md-checkbox v-model="string" @change="OnChange" value="piensg27">Sonde 27</md-checkbox>
                    </li>
                    <li>
                      <md-checkbox v-model="string" @change="OnChange" value="piensg28">Sonde 28</md-checkbox>
                    </li>
                    <li>
                      <md-checkbox v-model="string" @change="OnChange" value="piensg30">Sonde 30</md-checkbox>
                    </li>
                    <li>
                      <md-checkbox v-model="string" @change="OnChange" value="piensg31">Sonde 31</md-checkbox>
                    </li>
                    <li>
                      <md-checkbox v-model="string" @change="OnChange" value="piensg32">Sonde 32</md-checkbox>
                    </li>
                  </ul>
                </drop-down>
              </div>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      string : [],
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    OnChange(){
      this.$store.commit('SetStations',this.string)
      console.log(this.$store.state.Stations);
    }
  },
};
</script>

<style lang="css"></style>
