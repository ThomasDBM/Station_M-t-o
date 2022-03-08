<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a href="#/dashboard" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p></a
      >
    </li>
    <li>
      <a href="#/maps" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">location_on</i>
        <p>maps</p></a
      >
    </li>
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">settings_input_antenna</i>
          <p>Stations</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li>
            <md-checkbox v-model="string" value="piensg27"
              >Sonde 27</md-checkbox
            >
          </li>
          <li>
            <md-checkbox v-model="string" value="piensg28"
              >Sonde 28</md-checkbox
            >
          </li>
          <li>
            <md-checkbox v-model="string" value="piensg30"
              >Sonde 30</md-checkbox
            >
          </li>
          <li>
            <md-checkbox v-model="string" value="piensg31"
              >Sonde 31</md-checkbox
            >
          </li>
          <li>
            <md-checkbox v-model="string" value="piensg32"
              >Sonde 32</md-checkbox
            >
          </li>
        </ul>
      </drop-down>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      string: [],
      search: null,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
      ],
    };
  },
};
</script>
