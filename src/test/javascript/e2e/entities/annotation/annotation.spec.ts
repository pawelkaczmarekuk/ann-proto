import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnnotationComponentsPage, AnnotationDeleteDialog, AnnotationUpdatePage } from './annotation.page-object';

describe('Annotation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let annotationUpdatePage: AnnotationUpdatePage;
    let annotationComponentsPage: AnnotationComponentsPage;
    let annotationDeleteDialog: AnnotationDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Annotations', async () => {
        await navBarPage.goToEntity('annotation');
        annotationComponentsPage = new AnnotationComponentsPage();
        expect(await annotationComponentsPage.getTitle()).toMatch(/Annotations/);
    });

    it('should load create Annotation page', async () => {
        await annotationComponentsPage.clickOnCreateButton();
        annotationUpdatePage = new AnnotationUpdatePage();
        expect(await annotationUpdatePage.getPageTitle()).toMatch(/Create or edit a Annotation/);
        await annotationUpdatePage.cancel();
    });

    it('should create and save Annotations', async () => {
        await annotationComponentsPage.clickOnCreateButton();
        await annotationUpdatePage.annotationTypeSelectLastOption();
        await annotationUpdatePage.setPageInput('5');
        expect(await annotationUpdatePage.getPageInput()).toMatch('5');
        await annotationUpdatePage.setXInput('5');
        expect(await annotationUpdatePage.getXInput()).toMatch('5');
        await annotationUpdatePage.setYInput('5');
        expect(await annotationUpdatePage.getYInput()).toMatch('5');
        await annotationUpdatePage.setWidthInput('5');
        expect(await annotationUpdatePage.getWidthInput()).toMatch('5');
        await annotationUpdatePage.setHeightInput('5');
        expect(await annotationUpdatePage.getHeightInput()).toMatch('5');
        await annotationUpdatePage.annotationSetSelectLastOption();
        await annotationUpdatePage.save();
        expect(await annotationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Annotation', async () => {
        const nbButtonsBeforeDelete = await annotationComponentsPage.countDeleteButtons();
        await annotationComponentsPage.clickOnLastDeleteButton();

        annotationDeleteDialog = new AnnotationDeleteDialog();
        expect(await annotationDeleteDialog.getDialogTitle()).toMatch(/Are you sure you want to delete this Annotation?/);
        await annotationDeleteDialog.clickOnConfirmButton();

        expect(await annotationComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
