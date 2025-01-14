<script setup>
</script>
<template>
    <NuxtLayout>
     <NuxtPage/>
    </NuxtLayout>
   
 
 
  
</template>
<style>
:root {
    --slider-connect-bg: #009688;
    --slider-tooltip-bg: #009688;
    --slider-handle-ring-color: #3b82f630;
    --slider-height: 10px;
    --slider-radius: 6px;
    --slider-handle-bg: #009688;
    --slider-handle-ring-color: #009688;

    --vc-clr-primary: #009688;
    --vc-clr-secondary: #009688;
    --vc-clr-white: #ffffff;
}

/* width */
::-webkit-scrollbar {
    width: 4px;
    height: 0px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #009688;
    border-radius: 1px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #009688;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.centerContent {
    margin: 0 auto !important;
    max-width: 1920px;
}

/* wave animation for hand io tour conformation modal */
.wave {
    display: inline-block;
    animation-name: wave-animation;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    transform-origin: 70% 70%;
}
</style>

