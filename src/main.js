const statusHeader = document.querySelector(".status-header span:last-child");

if (statusHeader) {
  const buildId = new URLSearchParams(window.location.search).get("build");

  if (buildId) {
    statusHeader.textContent = `Pipeline build ${buildId}`;
  }
}
