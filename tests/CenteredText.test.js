import { mount } from "@vue/test-utils";
import CenteredText from "../src/components/CenteredText.vue";
describe("CenteredText.vue", () => {
    it("renders the initial text", () => {
        const wrapper = mount(CenteredText);
        const textElement = wrapper.find(".center-text__text");
        expect(textElement.text()).toBe("Center me");
    });
    it("updates the text when input changes", async () => {
        const wrapper = mount(CenteredText);
        const inputElement = wrapper.find("input");
        const textElement = wrapper.find(".center-text__text");
        await inputElement.setValue("New text");
        expect(textElement.text()).toBe("New text");
    });
});
