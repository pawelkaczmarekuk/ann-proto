import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnnotationSetComponentsPage, AnnotationSetDeleteDialog, AnnotationSetUpdatePage } from './annotation-set.page-object';

describe('AnnotationSet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let annotationSetUpdatePage: AnnotationSetUpdatePage;
    let annotationSetComponentsPage: AnnotationSetComponentsPage;
    let annotationSetDeleteDialog: AnnotationSetDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AnnotationSets', async () => {
        await navBarPage.goToEntity('annotation-set');
        annotationSetComponentsPage = new AnnotationSetComponentsPage();
        expect(await annotationSetComponentsPage.getTitle()).toMatch(/Annotation Sets/);
    });

    it('should load create AnnotationSet page', async () => {
        await annotationSetComponentsPage.clickOnCreateButton();
        annotationSetUpdatePage = new AnnotationSetUpdatePage();
        expect(await annotationSetUpdatePage.getPageTitle()).toMatch(/Create or edit a Annotation Set/);
        await annotationSetUpdatePage.cancel();
    });

    it('should create and save AnnotationSets', async () => {
        await annotationSetComponentsPage.clickOnCreateButton();
        await annotationSetUpdatePage.setDocumentIdInput('documentId');
        expect(await annotationSetUpdatePage.getDocumentIdInput()).toMatch('documentId');
        await annotationSetUpdatePage.save();
        expect(await annotationSetUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last AnnotationSet', async () => {
        const nbButtonsBeforeDelete = await annotationSetComponentsPage.countDeleteButtons();
        await annotationSetComponentsPage.clickOnLastDeleteButton();

        annotationSetDeleteDialog = new AnnotationSetDeleteDialog();
        expect(await annotationSetDeleteDialog.getDialogTitle()).toMatch(/Are you sure you want to delete this Annotation Set?/);
        await annotationSetDeleteDialog.clickOnConfirmButton();

        expect(await annotationSetComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
