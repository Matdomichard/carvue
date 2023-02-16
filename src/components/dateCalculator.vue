<template>
  <div>
    {{ sleepCalculator }}
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

export interface Props {
  date: Date;
}

export default {
  props: {
    date: {
      type: Date, // change type to Date
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
      const eventDate = selectedDate.value; // use as Date
      const diffTime = eventDate.getTime() - now.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      switch (userStore.$state.user.timeUnit) {
        case 'dodos':
          return `${Math.ceil(diffDays)} dodos`;
        case 'jours':
          return `${Math.ceil(diffDays) + 1} jours`;

        default:
          return '';
      }
    });

    return {
      sleepCalculator,
    };
  },
};
</script>
