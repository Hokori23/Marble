<template>
  <q-page class="team-center column items-center">
    <q-card class="team-center-card column">
      <q-card-section class="non-selectable">
        <div class="text-h6 text-center text-weight-bold">
          团队大厅
        </div>
        <TeamUserInfo :userInfo="userInfo" />
      </q-card-section>

      <q-separator />
      <div class="team-center-list non-selectable">
        <q-item-label header>
          已加入的团队
          <q-btn
            class="q-ml-md"
            outline
            color="primary"
            size="sm"
            @click="handleNewTeamDisplay"
          >
            创建团队
          </q-btn>
          <NewTeamDialog
            ref="newTeamDialog"
            :display.sync="newTeamDisplay"
            :isLoading="isCreatingNewTeam"
            @create-new-team="handleCreateNewTeam"
          />
        </q-item-label>
        <q-separator inset />
        <TeamOverview v-for="team in teams" :key="team.id" :team="team" />
        <div class="team-center--loading">
          <q-spinner-dots v-if="isLoading" color="primary" size="100%" />
        </div>
      </div>
    </q-card>
    <div class="row justify-center team-center-pagination q-my-sm">
      <q-pagination v-model="page" :max="maxPage" :disable="isLoading" input>
      </q-pagination>
    </div>
  </q-page>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onActivated,
  ref,
  watch,
} from '@vue/composition-api';
import TeamUserInfo from 'src/components/TeamUserInfo.vue';
import TeamOverview from 'src/components/TeamOverview.vue';
import NewTeamDialog from 'src/components/NewTeamDialog.vue';
import { PathName, RouteName } from 'src/router/routes';
import { mapState } from 'vuex';
import { StateInterface } from 'src/store';
import request from 'src/request';
import { Notify } from 'quasar';
import { Team, TeamWithUsers } from 'src/request/team';

interface NewTeamDialogProps extends Vue {
  onReset: () => void;
  hide: () => void;
}
export default defineComponent({
  name: 'TeamCenter',
  components: {
    TeamUserInfo,
    TeamOverview,
    NewTeamDialog,
  },
  setup() {
    const page = ref(1);
    const capacity = ref(5);
    const total = ref(0);
    const maxPage = computed(() => {
      return Math.ceil(total.value / capacity.value);
    });
    const teams = ref([] as TeamWithUsers[]);

    const isLoading = ref(false);

    const retrieveJoined = async () => {
      isLoading.value = true;
      const res = await request.team.retrieveJoined(page.value, capacity.value);
      isLoading.value = false;
      if (!res || res.code !== 0 || !res.data) {
        Notify.create({
          type: 'warning',
          message: '查询团队失败',
        });
        return;
      }
      const data = res.data;
      total.value = data.total;
      teams.value = data.teams;
    };

    const newTeamDisplay = ref(false);
    const isCreatingNewTeam = ref(false);
    const handleNewTeamDisplay = () => {
      newTeamDisplay.value = true;
    };

    watch(page, retrieveJoined);

    onActivated(retrieveJoined);

    return {
      page,
      capacity,
      total,
      maxPage,
      teams,
      isLoading,
      newTeamDisplay,
      isCreatingNewTeam,
      handleNewTeamDisplay,
      retrieveJoined,
      RouteName,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => (state as StateInterface).common.userInfo,
    }),
  },
  methods: {
    async handleCreateNewTeam(newTeam: Team) {
      this.isCreatingNewTeam = true;
      const res = await request.team.create(newTeam);
      this.isCreatingNewTeam = false;
      if (!res || res.code !== 0 || !res.data) {
        this.$q.notify({
          type: 'warning',
          message: '创建团队失败',
        });
        return;
      }
      const dialog = this.$refs['newTeamDialog'] as NewTeamDialogProps;
      dialog.onReset();
      // 进入新团队页面
      void this.$router.push(`${PathName.TEAM_CENTER}/${String(res.data.id)}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.team-center {
  &-card,
  &-pagination {
    width: 100%;
  }
  &-card {
    flex: auto;
  }
  &-list {
    position: relative;
    flex: auto;
  }
  &--loading {
    position: absolute;
    left: 50%;
    top: 30%;
    width: 40px;
    height: 40px;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
