<script>
import { Chrome } from 'vue-color';
import tinycolor from 'tinycolor2';

export default {
    props: ['color'],
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            pickerColor: this.color,
            colorValue: this.color,
            displayPicker: false
        }
    },
    mounted() {
        this.setColor(this.color || '#000000');
    },
    methods: {
        setColor(color) {
            this.updatePickerColor(color);
            this.colorValue = color;
        },
        updatePickerColor(color) {
            this.pickerColor = color;
        },
        showPicker() {
            document.addEventListener('click', this.documentClick);
            this.displayPicker = true;
        },
        hidePicker() {
            document.removeEventListener('click', this.documentClick);
            this.displayPicker = false;
        },
        togglePicker() {
            this.displayPicker ? this.hidePicker() : this.showPicker();
        },
        updateFromInput() {
            this.updatePickerColor(this.colorValue);
        },
        updateFromPicker(color) {
            this.colorValue = tinycolor(color.rgba).toString();
        },
        documentClick(e) {
            const picker = this.$refs.colorpicker;
            if (picker && picker !== e.target && !picker.contains(e.target)) {
                this.hidePicker();
            }
        }
    },
    watch: {
        colorValue(val) {
            if (val) {
                this.updatePickerColor(val);
                this.$emit('input', val);
            }
        }
    }
}
</script>

<template>
    <div class="input-group color-picker" ref="colorpicker">
        <input
            type="text"
            class="form-control"
            v-model="colorValue"
            @focus="showPicker"
            @input="updateFromInput"
        />
        <span v-if="colorValue" class="input-group-addon color-picker-container">
            <span
                class="current-color"
                :style="{ 'background-color': colorValue }"
                @click="togglePicker"
            >
                <i :style="{ 'background-color': colorValue }"></i>
            </span>
            <chrome-picker
                class="picker-offset"
                ref="colorPicker"
                :value="pickerColor"
                @input="updateFromPicker"
                v-if="displayPicker"
            />
        </span>
    </div>
</template>

<style scoped>
.current-color {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #000;
    cursor: pointer;
}

.vc-chrome {
    position: absolute;
    right: 0;
    z-index: 100;
}

.picker-offset {
    right: 45px;
    bottom: -100px;
}

</style>
