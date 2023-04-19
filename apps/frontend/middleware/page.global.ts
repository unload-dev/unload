export default defineNuxtRouteMiddleware((to, from) => {
  const getDepth = (path: String) => {
    return path.split("/").filter((seg) => seg.length > 0).length;
  };

  const toDepth = getDepth(to.path);
  const fromDepth = getDepth(from.path);

  if (toDepth > fromDepth) {
    to.meta.layoutTransition = { name: "page-left" };
    from.meta.layoutTransition = { name: "page-left" };
  } else {
    to.meta.layoutTransition = { name: "page-right" };
    from.meta.layoutTransition = { name: "page-right" };
  }
});
