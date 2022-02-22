<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <div class="titlebar">
          <div class="dashboard">
            <transition            
            :name="transitionName"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter">
            <div class="home" v-if="this.route === 'Home'">
                <p>{{this.pages.Home}}</p>
            </div>
            </transition>
          </div>
          <div class="">
            <transition            
            :name="transitionName"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter">
            <div class="menu-title" v-if="this.route === 'Create'">
              <div class="back" v-on:click="home()">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 20.505 37.474">
                  <line id="Line_2" data-name="Line 2" y1="18.383" x2="18.383" transform="translate(1.061 1.061)" fill="none" stroke="#c2c2c2" stroke-width="3"/>
                  <line id="Line_3" data-name="Line 3" x2="18.383" y2="18.383" transform="translate(1.061 18.03)" fill="none" stroke="#c2c2c2" stroke-width="3"/>
                </svg>
              </div>
              <p>{{this.pages.Create}}</p>
            </div>
            </transition>
          </div>
          <div class="">
            <transition            
            :name="transitionName"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter">
              <div class="menu-title" v-if="this.route === 'Add'">
                <div class="back" v-on:click="home()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 20.505 37.474">
                    <line id="Line_2" data-name="Line 2" y1="18.383" x2="18.383" transform="translate(1.061 1.061)" fill="none" stroke="#c2c2c2" stroke-width="3"/>
                    <line id="Line_3" data-name="Line 3" x2="18.383" y2="18.383" transform="translate(1.061 18.03)" fill="none" stroke="#c2c2c2" stroke-width="3"/>
                  </svg>
                </div>
                <p>{{this.pages.Add}}</p>
              </div>
            </transition>
          </div>
        </div>
        <div class="card-body">
          <transition
           :name="transitionName"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter">
          <router-view></router-view>
          </transition>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { EventBus } from "../event-bus"
const DEFAULT_TRANSITION = 'fade';
export default {
  name: 'App',

  components: {
  },
  data(){
    return {
      route: "",
      transitionName: DEFAULT_TRANSITION,
      pages: {
        Home: "Dashboard",
        Create: "Create Document",
        Add: "Add Template"
      }
    }
  },
  created() {
    EventBus.$on("routeChange", (data) => {
      this.route = ""
      setTimeout(() => {
        this.route = data;
      }, 250)
    })
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

    setTimeout(() => {
      element.style.height = height;
    });
    },
    home() {
      this.$router.push("/")
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  }
};
</script>
<style>
  .theme--light.v-select .v-select__selection--comma {
    color: white!important;
  }
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
    color: rgba(255, 255, 255, 0.42)!important;
  }
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset:hover {
    color: rgba(255, 255, 255, 0.918)!important;
  }
  .theme--light.v-label {
    color: rgba(255, 255, 255, 0.21)!important;
  }
  .theme--light.v-input input, .theme--light.v-input textarea {
    color: rgba(255, 255, 255, 0.75)!important;
  }
  .table-row .textfield {
    border-bottom: 2px solid #535353!important;
    padding-top: 25px;
  }
  .theme--light.v-input input{
    color: rgba(255, 255, 255, 0.75)!important;
  }
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
  #inspire {
    background-color: #2B2B2B; 
  }
  .titlebar {
    margin-top: 2%;
    margin-bottom: 1%;
    width: 100%;
    background-color: #3D3D3D;
    padding: 20px 0;
    font-size: 20px;
    min-height: 70px;
    border-radius: 10px;
    color: white;
  }
  .titlebar .dashboard {
    width: inherit;
    text-align: center;
  }
  .titlebar p {
    margin-bottom: 0!important;
  }
  .card-body {
    background-color: #3D3D3D;
    min-height: 70vh;
    border-radius: 10px;
    padding: 20px;
  }
  .back {
    display: flex;
    align-items: center;
    width: 60px;
    justify-content: center;
    border-right: 2px #5c5c5c solid;
    margin-right: 15px;
    cursor: pointer;
  }
  .back svg {
    transition: .2s;
  }
  .back:hover svg{
    opacity: 0.5;
  }
  .home {
    width: 100%;
    text-align: center;
  }
  .menu-title {
    display: flex;
    align-items: center;
  }
</style>