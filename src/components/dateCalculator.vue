<template>
  <div>
    {{ sleepCalculator }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

export interface Props {
  date: string;
}

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  setup(props: Props) {
    const selectedDate = ref(new Date(props.date));
    const userStore = useUserStore();

    const sleepCalculator = computed(() => {
      if (!selectedDate.value) {
        return '';
      }

      const now = new Date();
      const eventDate = selectedDate.value; 
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
});
</script>
