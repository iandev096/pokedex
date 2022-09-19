export function setClientSideQueryParam(key: string, value: string) {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newRelativePathQuery =
      window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
  }
}
