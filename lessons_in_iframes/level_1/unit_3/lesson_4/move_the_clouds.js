window.addEventListener('load', function(){  loadingIsCompleteFunctionCloudMove();  }, { once: true });

function loadingIsCompleteFunctionCloudMove() {
  document.getElementById('divIdForFlyingCloudsContainer').classList.add("moveTheClouds");
  document.getElementById('divIdForShadowsOfCloudsContainer').classList.add("moveTheClouds");
}
