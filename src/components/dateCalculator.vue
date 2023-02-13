<template>
  <div>
    {{ sleepCalculator }}
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

interface Props {
  date: string;
}

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  setup(props: Props) {
    const selectedDate = ref(props.date);
    const userStore = useUserStore();

const sleepCalculator = computed(() => {
  if (!selectedDate.value) {
    return '';
  }

  const now = new Date();
  const eventDate = new Date(selectedDate.value);
  const diffTime = eventDate.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  switch (userStore.$state.user.timeUnit) {
    case 'dodos':
    return Math.ceil(diffDays) + " dodos";
    case 'jours':
      return Math.ceil(diffDays) +1 + " jours";

    default:
      return '';
  }
});

    return {
      sleepCalculator,
      timeUnit: userStore.$state.user.timeUnit,
    };
  },
};
</script>
