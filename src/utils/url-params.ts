export const getSearchParams = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const setSearchParams = (
  paramsToSet: Record<string, any> | ((prevParams: string) => string)
) => {
  // Get current URL parameters
  const currentParams = new URLSearchParams(window.location.search);

  if (typeof paramsToSet === 'function') {
    // Handle function updates (used for deleting params)
    const newParamsString = paramsToSet(currentParams.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${newParamsString ? "?" + newParamsString : ""}`
    );
    return;
  }

  // Handle object updates (adding/updating params)
  Object.entries(paramsToSet).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
  });

  // Update URL with all parameters
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${currentParams.toString() ? "?" + currentParams.toString() : ""
    }`
  );
};