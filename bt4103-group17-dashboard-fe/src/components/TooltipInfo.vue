<template>
    <span class="tooltip-wrapper">
      ℹ️
      <span class="tooltip-text">
        {{ text }}
      </span>
    </span>
</template>
  
<script>
export default {
  name: "TooltipInfo",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
  
<style scoped>
.tooltip-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin-left: 6px;
    font-size: 14px;
}
  
.tooltip-wrapper:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
  
.tooltip-text {
    visibility: hidden;
    width: 250px;
    background-color: #333;
    color: #fff;
    text-align: left;
    padding: 8px;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    top: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-size: 12px;
}
</style>
  