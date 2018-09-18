import { element, by, ElementFinder } from 'protractor';

export class AnnotationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-annotation div table .btn-danger'));
    title = element.all(by.css('jhi-annotation div h2#page-heading span')).first();

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

export class AnnotationUpdatePage {
    pageTitle = element(by.id('jhi-annotation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    annotationTypeSelect = element(by.id('field_annotationType'));
    pageInput = element(by.id('field_page'));
    xInput = element(by.id('field_x'));
    yInput = element(by.id('field_y'));
    widthInput = element(by.id('field_width'));
    heightInput = element(by.id('field_height'));
    annotationSetSelect = element(by.id('field_annotationSet'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setAnnotationTypeSelect(annotationType) {
        await this.annotationTypeSelect.sendKeys(annotationType);
    }

    async getAnnotationTypeSelect() {
        return this.annotationTypeSelect.element(by.css('option:checked')).getText();
    }

    async annotationTypeSelectLastOption() {
        await this.annotationTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPageInput(page) {
        await this.pageInput.sendKeys(page);
    }

    async getPageInput() {
        return this.pageInput.getAttribute('value');
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

    async annotationSetSelectLastOption() {
        await this.annotationSetSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async annotationSetSelectOption(option) {
        await this.annotationSetSelect.sendKeys(option);
    }

    getAnnotationSetSelect(): ElementFinder {
        return this.annotationSetSelect;
    }

    async getAnnotationSetSelectedOption() {
        return this.annotationSetSelect.element(by.css('option:checked')).getText();
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

export class AnnotationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-annotation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-annotation'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
