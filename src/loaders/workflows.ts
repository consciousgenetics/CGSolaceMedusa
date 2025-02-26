/**
 * This is a dummy loader for the Workflows module.
 * It's used to prevent errors when the Workflows module is disabled.
 */
export default async () => {
  console.log("Workflows module is disabled. Using dummy loader.")
  return {}
} 