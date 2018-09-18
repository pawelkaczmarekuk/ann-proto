import { element, by, ElementFinder } from 'protractor';

export class RectangleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-rectangle div table .btn-danger'));
    title = element.all(by.css('jhi-rectangle div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class RectangleUpdatePage {
    pageTitle = element(by.id('jhi-rectangle-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    xInput = element(by.id('field_x'));
    yInput = element(by.id('field_y'));
    widthInput = element(by.id('field_width'));
    heightInput = element(by.id('field_height'));
    annotationSelect = element(by.id('field_annotation'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setXInput(x) {
        await this.xInput.sendKeys(x);
    }

    async getXInput() {
        return this.xInput.getAttribute('value');
    }

    async setYInput(y) {
        await this.yInput.sendKeys(y);
    }

    async getYInput() {
        return this.yInput.getAttribute('value');
    }

    async setWidthInput(width) {
        await this.widthInput.sendKeys(width);
    }

    async getWidthInput() {
        return this.widthInput.getAttribute('value');
    }

    async setHeightInput(height) {
        await this.heightInput.sendKeys(height);
    }

    async getHeightInput() {
        return this.heightInput.getAttribute('value');
    }

    async annotationSelectLastOption() {
        await this.annotationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async annotationSelectOption(option) {
        await this.annotationSelect.sendKeys(option);
    }

    getAnnotationSelect(): ElementFinder {
        return this.annotationSelect;
    }

    async getAnnotationSelectedOption() {
        return this.annotationSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class RectangleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-rectangle-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-rectangle'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
