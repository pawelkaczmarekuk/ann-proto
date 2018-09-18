import { element, by, ElementFinder } from 'protractor';

export class AnnotationSetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-annotation-set div table .btn-danger'));
    title = element.all(by.css('jhi-annotation-set div h2#page-heading span')).first();

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

export class AnnotationSetUpdatePage {
    pageTitle = element(by.id('jhi-annotation-set-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    documentIdInput = element(by.id('field_documentId'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDocumentIdInput(documentId) {
        await this.documentIdInput.sendKeys(documentId);
    }

    async getDocumentIdInput() {
        return this.documentIdInput.getAttribute('value');
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

export class AnnotationSetDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-annotationSet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-annotationSet'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
