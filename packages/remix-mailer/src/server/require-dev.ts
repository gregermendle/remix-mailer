const requireDev = () => {
  const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

  if (!isDev) {
    throw new Response("You do not have access to that resource", {
      status: 403,
    });
  }

  return true;
};

export { requireDev };
