import { ref } from '@vue/composition-api';
export default () => {
  const newTeamDisplay = ref(false);
  const isCreatingNewTeam = ref(false);
  const handleNewTeamDisplay = () => {
    newTeamDisplay.value = true;
  };
  return {
    newTeamDisplay,
    isCreatingNewTeam,
    handleNewTeamDisplay,
  };
};
