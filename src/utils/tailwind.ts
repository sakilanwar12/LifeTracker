/**
 * Tailwind CSS Setup using twrnc
 * This file exports the configured twrnc instance for use throughout the app
 */

import { create } from "twrnc";

// Create and export the tailwind instance
const tw = create(require("../../tailwind.config.js"));

export default tw;
