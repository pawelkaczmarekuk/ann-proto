import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RectangleComponentsPage, RectangleDeleteDialog, RectangleUpdatePage } from './rectangle.page-object';

describe('Rectangle e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let rectangleUpdatePage: RectangleUpdatePage;
    let rectangleComponentsPage: RectangleComponentsPage;
    let rectangleDeleteDialog: RectangleDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Rectangles', async () => {
        await navBarPage.goToEntity('rectangle');
        rectangleComponentsPage = new RectangleComponentsPage();
        expect(await rectangleComponentsPage.getTitle()).toMatch(/Rectangles/);
    });

    it('should load create Rectangle page', async () => {
        await rectangleComponentsPage.clickOnCreateButton();
        rectangleUpdatePage = new RectangleUpdatePage();
        expect(await rectangleUpdatePage.getPageTitle()).toMatch(/Create or edit a Rectangle/);
        await rectangleUpdatePage.cancel();
    });

    it('should create and save Rectangles', async () => {
        await rectangleComponentsPage.clickOnCreateButton();
        await rectangleUpdatePage.setXInput('5');
        expect(await rectangleUpdatePage.getXInput()).toMatch('5');
        await rectangleUpdatePage.setYInput('5');
        expect(await rectangleUpdatePage.getYInput()).toMatch('5');
        await rectangleUpdatePage.setWidthInput('5');
        expect(await rectangleUpdatePage.getWidthInput()).toMatch('5');
        await rectangleUpdatePage.setHeightInput('5');
        expect(await rectangleUpdatePage.getHeightInput()).toMatch('5');
        await rectangleUpdatePage.annotationSelectLastOption();
        await rectangleUpdatePage.save();
        expect(await rectangleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Rectangle', async () => {
        const nbButtonsBeforeDelete = await rectangleComponentsPage.countDeleteButtons();
        await rectangleComponentsPage.clickOnLastDeleteButton();

        rectangleDeleteDialog = new RectangleDeleteDialog();
        expect(await rectangleDeleteDialog.getDialogTitle()).toMatch(/Are you sure you want to delete this Rectangle?/);
        await rectangleDeleteDialog.clickOnConfirmButton();

        expect(await rectangleComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
