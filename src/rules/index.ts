import type { Rule } from "./rule";
import { eventBoundaryRule } from "./event-boundaries";

/** The built-in rules, run in order. Add a capability by adding a rule here. */
export const RULES: readonly Rule[] = [eventBoundaryRule];
