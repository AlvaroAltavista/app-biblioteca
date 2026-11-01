<template>
	<button
		class="base-btn"
		:class="[`base-btn-${variante}`]"
		:type="tipo"
		:disabled="disabled"
		@click="emit('click', $event)">
		<slot />
	</button>
</template>

<script setup lang="ts">
type btnVariante = "primario" | "secundario" | "inverso";

interface Props {
	variante?: btnVariante;
	disabled: boolean;
	tipo?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
	variante: "primario",
	disabled: false,
	tipo: "button",
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();
</script>

<style lang="css" scoped>
.base-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-family: var(--font-brand);
	font-weight: var(--fw-bold);
	line-height: var(--fh-low);
	padding: var(--pd-l) var(--pd-s);
	border-radius: var(--rd-s);
	white-space: nowrap;
	user-select: none;
	cursor: pointer;
	transition:
		background-color var(--transition-speed) ease,
		border-color var(--transition-speed) ease,
		color var(--transition-speed) ease,
		opacity var(--transition-speed) ease;
}

.base-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Variantes */
.base-btn-primario {
	background-color: var(--bkg-link-brand);
	color: var(--neutral-100);
}

.base-btn-primario:hover {
	background-color: var(--bkg-link-brand-hover);
}

.base-btn-primario:active {
	background-color: var(--bkg-link-brand-active);
}

.base-btn-secundario {
	background-color: var(--bkg-link-layout);
	color: var(--contenido-brand);
}

.base-btn-secundario:hover {
	background-color: var(--bkg-link-layout-hover);
}

.base-btn-secundario:active {
	background-color: var(--bkg-link-layout-active);
}
</style>
