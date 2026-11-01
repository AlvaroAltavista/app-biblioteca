<script setup lang="js">
import { reactive } from "vue";
import { logEvent } from "histoire/client";
import BaseBtn from "./BaseBtn.vue";

const playground = reactive({
	label: "Guardar libro",
	variant: "primario" | "secundario",
	disabled: false,
});
</script>

<template>
	<Story title="Átomos/BaseBtn">
		<Variant title="Primario">
			<BaseBtn @click="logEvent('click', $event)"> Primario </BaseBtn>
		</Variant>

		<Variant title="Secundario">
			<BaseBtn
				variante="secundario"
				@click="logEvent('click', $event)">
				Secundario
			</BaseBtn>
		</Variant>

		<Variant title="Primario Disabled">
			<BaseBtn
				disabled="true"
				@click="logEvent('click', $event)">
				Disabled
			</BaseBtn>
		</Variant>
	</Story>
</template>
