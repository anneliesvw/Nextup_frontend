<template>
  <div class="main-container">
    <add-member v-if="dialogVisible" :friends="friends" :members="members" :isVisible="true" @close="closeDialog">
          </add-member>
    <sidebar></sidebar>
    <div class="group-detail-container">
      <div class="group-detail-header">
        <div class="group-detail-top"></div>
        <div class="group-detail-name">Grindr vriendjes
          <i class="far fa-edit"></i>
        </div>
      </div>
      <div class="group-detail-wrapper">
        <div class="group-detail-members">
          <div v-for="(member, index) in members" :key="index" class="group-members">
            <div class="group-member-circle"></div>
            <div>{{member.name}}</div>
          </div>
          
          <div class="group-detail-addMember" @click="openDialog">+</div>
        </div>
        <div class="group-detail-nextUp">
          <div class="group-detail-label">Next Up</div>
          <div class="group-detail-next">
            <div class="group-detail-nextgraphic"></div>
          </div>
          <div class="group-detail-others">
            <div class="group-detail-othergraph" v-for="item in 2" :key="item"></div>
          </div>
        </div>
        <div>
          <div> all Activities </div>
          <div class="group-detail-wrapper">
            <div class="group-wrapper">
            <div class="group-add" @click="openDialog">
              <i class="fas fa-plus"></i>
              <span>Create activity</span>
            </div>
          </div>
          <div class="group-detail-activitiesdiv">
            <div v-for="item in 2" :key="item" >
            <i class="fas fa-minus" @click="removeActivity(index)"></i>
            <activity class="group-detail-activity"></activity>
          </div>
          </div>
          
          </div>
        </div>
        <div class="group-detail-activities">
          <div class="group-detail-label">Activities</div>
          <poll></poll>
        </div>
      </div>
    </div>
    <chat-menu></chat-menu>
  </div>
</template>

<script>
import Sidebar from '../components/sidebars/Sidebar.vue';
import ChatMenu from '../components/sidebars/ChatMenu.vue';
import Poll from '../components/activities/Poll.vue';
import Activity from '../components/activities/Activity.vue';
import AddMember from '../components/groups/AddMember.vue';

export default {
  components: {
    Sidebar,
    ChatMenu,
    Poll,
    Activity,
    AddMember,
  },
  data() {
    return {
      activities: [],
      members: [
        {
          value: 'Robbe12',
        },
        {
          value: 'Matjas',
        },
        {
          value: 'naam1',
        },
        {
          value: 'naam1',
        },
      ],
      friends: [
        {
          value: 'vriend1',
        },
        {
          value: 'andere vriend',
        },
        {
          value: 'vriendje',
        },
        {
          value: 'vriend',
        },
      ],
      showtop: false,
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
  },
};
</script>
