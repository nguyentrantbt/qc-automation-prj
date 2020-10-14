/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, textBox, into, $, click } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto Login page", async () => {
    await goto('https://dev.connect.reapit.cloud/login?response_type=code&client_id=672grsvi32r3fsd2fiqi9mpgq9&redirect_uri=https://dev.marketplace.reapit.cloud/admin/approvals&state=ADMIN');
});

step("Write <email> to email textbox", async (email) => {
    await write(email, into(textBox({id:"signInFormUsername"})));
});

step("Write <pass> to password textbox", async (pass) => {
    await write(pass, into(textBox({id:"signInFormPassword"})));
})

step("Click Sign in button", async () => {
    await click($("//input[@name='signInSubmitButton']"));
});

step("Click Developer on navigation menu", async () => {
    await click($("//div[contains(text(),'Developers')]"));
});

step("Search for <text>", async (text) => {
    await write("test", into(textBox({id: "name"})));
    await press('Enter'); 
});

step("Verify Total Developers after search", async () => {
    const total = await $("//div[@class='_1PST-']").text();
    assert.deepEqual(total, "Total: 157");
});

step("Click Deact button", async () => {
    await click($("//tr[1]//td[8]//button"));
});

step("Click Confirm button", async () => {
    await click($("//button[contains(text(),'Confirm')]"));
});

step("Click Back to List button", async () => {
    await click($("//button[contains(text(),'Back to List')]"));
});

