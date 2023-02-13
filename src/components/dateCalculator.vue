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

const franceTimezoneOffset = 2;

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
  const offsetNow = new Date(now.getTime() + (franceTimezoneOffset * 60 * 60 * 1000));
  const eventDate = new Date(selectedDate.value);
  const diffTime = eventDate.getTime() - offsetNow.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  switch (userStore.$state.user.timeUnit) {
    case 'dodos':
      return Math.round(diffDays / 3.5);
    case 'jours':
      return Math.round(diffDays);
    case 'mois':
      return Math.round(diffDays / 30.4167);
    case 'années':
      return Math.round(diffDays / 365);
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
