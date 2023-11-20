<template>
    <div id="container">
      <div>
        <p class="linear-wipe" style="text-align: left; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 44px; font-weight: 700;">Сейчас загрузится чат...</p>
      </div>
    </div>
  </template>
  
  
  <style scoped>
#container {
  z-index: 9999999;
  position: fixed;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  left: 0;
  top: 0;
  overflow: auto; /* Allow scrolling within the container */
}

@media (prefers-color-scheme: dark) {
    #container {
        background: #000 url('../assets/abstract/black-and-noise-background.png') no-repeat center center;
    }
}

@media (prefers-color-scheme: light) {
    #container {
        background-color: white;
    }
}

#container p {
  font-size: 16px;
  line-height: 45px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#container div {
    margin-top: 15vh;
    margin-left: 5vw;
}

.linear-wipe {
	background: linear-gradient(-74deg, #000000, #ffffff0b, #757575, #000000);
	background-size: 300%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: animated_text 5s ease-in-out infinite;
	-moz-animation: animated_text 5s ease-in-out infinite;
	-webkit-animation: animated_text 5s ease-in-out infinite;
}

@keyframes animated_text {
	0% { background-position: 0px 50%; }
	50% { background-position: 110% 50%; }
	100% { background-position: 0px 50%; }
}

.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all .3s linear;
}
.show-enter,
.show-leave-to {
    transform: translateX(100%);
}
</style>

  