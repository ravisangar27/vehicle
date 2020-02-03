<template>
    <div>
        <b-modal size="xl" ref="car-delete-modal" hide-footer title="Car Delete">
			<div class="d-block text-center">
				<b-row>
					<b-col>
						<p>Do you want delete this</p>
					</b-col>
				</b-row>
			</div>
			<b-button class="mt-3" variant="outline-danger" block @click="hideDeleteModal">Close Me</b-button>
        </b-modal>
    </div>
</template>

<script>
    export default {
        props: [
            "car",
        ],
    }
</script>