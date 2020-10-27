<template>
  <div>
    <!-- Nav tabs -->
    <slot name="tab-list"></slot>

    <!-- Tab panes -->
    <div class="tab-content">
        <slot name="tab-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: ['tabs']
}
</script>
