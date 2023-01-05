import { computed, ref } from "vue";

// At minimum, we want to take 3 seconds to activate the scene.
const DEFAULT_DELAY = 3000;

// We take 3 seconds to transition to the new scene
const DEFAULT_OPTIONS = {
  transition: 3,
};

export function useScene(hass, entityId, options = {}) {
  const awaiting = ref(false);
  const error = ref(null);
  const state = computed(() => hass.states[entityId]);

  async function activate() {
    // Stop the spam!
    if (awaiting.value) {
      return;
    }

    awaiting.value = true;
    const startDate = Date.now();

    try {
      await hass.callService("scene", "turn_on", {
        entity_id: entityId,
        ...DEFAULT_OPTIONS,
        ...options,
      });
    } catch (err) {
      console.error(err);
      error.value = err;
    }

    const runtime = Date.now() - startDate;

    // If it took less than DEFAULT_DELAY to run the command, we want to
    // wait a bit in the disabled state to show it's actually working.
    if (runtime < DEFAULT_DELAY) {
      setTimeout(() => {
        awaiting.value = false;
      }, DEFAULT_DELAY - runtime);
    } else {
      awaiting.value = false;
    }
  }

  return { awaiting, activate, error, state };
}
