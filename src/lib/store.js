import { syncedStore, getYjsDoc  } from "@syncedstore/core";
import { svelteSyncedStore } from "@syncedstore/svelte";
import { IndexeddbPersistence } from "y-indexeddb";

const stepsStore = syncedStore({steps: []})

const doc = getYjsDoc(stepsStore);

export const store = svelteSyncedStore(stepsStore)

const provider = new IndexeddbPersistence("hiit-workout", doc);